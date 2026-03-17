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

function Update-RootVersion {
    param(
        [object]$RootManifest,
        [string]$PluginName,
        [int]$Version
    )

    if (-not $RootManifest -or -not $RootManifest.data) {
        return $false
    }

    $entry = $RootManifest.data | Where-Object {
        $_.path -like "*/$PluginName/$PluginName.zip"
    } | Select-Object -First 1

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
    Write-JsonFile -Path $pluginManifestPath -Data $pluginManifest
    Write-Host ("Updated {0} version -> {1}" -f $pluginName, $nextVersion)

    if (Update-RootVersion -RootManifest $rootManifest -PluginName $pluginName -Version $nextVersion) {
        $rootManifestModified = $true
    }

    $zipPath = Join-Path $pluginDir.FullName ("{0}.zip" -f $pluginName)
    $tempPath = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())

    New-Item -ItemType Directory -Path $tempPath | Out-Null

    try {
        $items = Get-ChildItem -Path $pluginDir.FullName -Force | Where-Object {
            -not ($_.PSIsContainer -eq $false -and $_.Extension -eq '.zip')
        }

        if (-not $items) {
            throw ("Plugin directory '{0}' does not contain any files to package." -f $pluginName)
        }

        foreach ($item in $items) {
            Copy-Item -Path $item.FullName -Destination $tempPath -Recurse -Force
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