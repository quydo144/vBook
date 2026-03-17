param(
    [string]$RootPath = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string[]]$PluginNames
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

function Write-JsonFile {
    param(
        [string]$Path,
        [object]$Data
    )

    $json = $Data | ConvertTo-Json -Depth 100
    Set-Content -Path $Path -Value ($json + [Environment]::NewLine) -Encoding utf8
}

function Get-RootEntry {
    param(
        [object]$RootManifest,
        [string]$PluginName
    )

    if (-not $RootManifest -or -not $RootManifest.data) {
        return $null
    }

    return $RootManifest.data | Where-Object {
        $_.path -like "*/$PluginName/$PluginName.zip"
    } | Select-Object -First 1
}

function Update-RootVersion {
    param(
        [object]$RootManifest,
        [string]$PluginName,
        [int]$Version
    )

    $entry = Get-RootEntry -RootManifest $RootManifest -PluginName $PluginName

    if ($entry) {
        $entry.version = $Version
        Write-Host ("Updated root plugin.json version for {0} -> {1}" -f $PluginName, $Version)
        return $true
    }
    else {
        Write-Host ("No root plugin.json entry found for {0}" -f $PluginName)
        return $false
    }
}

function Update-RootSource {
    param(
        [object]$RootManifest,
        [string]$PluginName,
        [string]$Source
    )

    $entry = Get-RootEntry -RootManifest $RootManifest -PluginName $PluginName

    if ($entry) {
        $entry.source = $Source
        Write-Host ("Updated root plugin.json source for {0} -> {1}" -f $PluginName, $Source)
        return $true
    }

    return $false
}

$pluginDirs = Get-ChildItem -Path $RootPath -Directory | Where-Object {
    Test-Path (Join-Path $_.FullName 'plugin.json')
}

if (-not $pluginDirs) {
    throw 'No plugin directories with plugin.json were found.'
}

$pluginMap = @{}
foreach ($pluginDir in $pluginDirs) {
    $pluginMap[$pluginDir.Name] = $pluginDir
}

if ($PluginNames -and $PluginNames.Count -gt 0) {
    $pluginDirs = foreach ($pluginName in $PluginNames) {
        if (-not $pluginMap.ContainsKey($pluginName)) {
            throw ("Unknown plugin directory '{0}'." -f $pluginName)
        }

        $pluginMap[$pluginName]
    }
}

if (-not $pluginDirs -or $pluginDirs.Count -eq 0) {
    Write-Host 'No plugin directories selected.'
    exit 0
}

$rootManifestPath = Join-Path $RootPath 'plugin.json'
$rootManifest = $null
$rootManifestModified = $false
if (Test-Path $rootManifestPath) {
    $rootManifest = Get-Content -Path $rootManifestPath -Raw | ConvertFrom-Json
}

foreach ($pluginDir in $pluginDirs) {
    $pluginName = $pluginDir.Name
    $pluginManifestPath = Join-Path $pluginDir.FullName 'plugin.json'
    $pluginManifest = Get-Content -Path $pluginManifestPath -Raw | ConvertFrom-Json

    if (-not $pluginManifest.metadata.version) {
        throw ("Plugin '{0}' does not contain metadata.version in plugin.json." -f $pluginName)
    }

    $nextVersion = [int]$pluginManifest.metadata.version + 1
    $pluginManifest.metadata.version = $nextVersion
    Write-Host ("Updated {0} version -> {1}" -f $pluginName, $nextVersion)

    $configJsPath = Join-Path $pluginDir.FullName 'src\config.js'
    if (Test-Path $configJsPath) {
        $configContent = Get-Content -Path $configJsPath -Raw
        if ($configContent -match "const\s+BASE_URL\s*=\s*'([^']+)'") {
            $baseUrl = $matches[1]
            $pluginManifest.metadata.source = $baseUrl
            Write-Host ("Updated {0} source from config.js -> {1}" -f $pluginName, $baseUrl)

            if (Update-RootSource -RootManifest $rootManifest -PluginName $pluginName -Source $baseUrl) {
                $rootManifestModified = $true
            }
        }
    }

    Write-JsonFile -Path $pluginManifestPath -Data $pluginManifest

    if (Update-RootVersion -RootManifest $rootManifest -PluginName $pluginName -Version $nextVersion) {
        $rootManifestModified = $true
    }

    $zipPath = Join-Path $pluginDir.FullName ("{0}.zip" -f $pluginName)
    $tempPath = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())

    New-Item -ItemType Directory -Path $tempPath | Out-Null

    try {
        $srcPath = Join-Path $pluginDir.FullName 'src'
        $iconPath = Join-Path $pluginDir.FullName 'icon.png'

        if (-not (Test-Path $pluginManifestPath)) {
            throw ("Plugin '{0}' is missing plugin.json." -f $pluginName)
        }

        if (-not (Test-Path $srcPath)) {
            throw ("Plugin '{0}' is missing src directory." -f $pluginName)
        }

        Copy-Item -Path $pluginManifestPath -Destination (Join-Path $tempPath 'plugin.json') -Force
        Copy-Item -Path $srcPath -Destination (Join-Path $tempPath 'src') -Recurse -Force

        if (Test-Path $iconPath) {
            Copy-Item -Path $iconPath -Destination (Join-Path $tempPath 'icon.png') -Force
        }

        if (Test-Path $zipPath) {
            Remove-Item -Path $zipPath -Force
        }

        [System.IO.Compression.ZipFile]::CreateFromDirectory($tempPath, $zipPath)
        Write-Host ("Created {0}" -f $zipPath)
    }
    finally {
        if (Test-Path $tempPath) {
            Remove-Item -Path $tempPath -Recurse -Force
        }
    }
}

if ($rootManifestModified) {
    Write-JsonFile -Path $rootManifestPath -Data $rootManifest
}