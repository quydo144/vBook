function execute(url, page) {
    if (url.includes("bookmark")) {
        let response = fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html; charset=UTF-8",
                "User-Agent": "PostmanRuntime/7.29.0",
                "cookie": "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Ik84MWQvZkpDQUNyNUtrb0ZOK1NyMnc9PSIsInZhbHVlIjoiZnNqVXUydCszRTJmT2lkTVp6VmUwTktDVFBkV1dQc1AvL0s0b0NjdnhwS1l4UHZiUCs4SndKM3dhdjFOY3FqZzk4WXpScFAxVzhGR1FJMXQ0MXl4TmswVy9kdlM4dHVsLy9QZXhqRnFrRDE0VU5ESllYelZpT2c4dXRTZ0RPeXBZR3kwa1c3OExJajN6OFJuN1Bkc1B1M3B3QWNHZ2QvYnJaWVJ1c3FqTmtxYW8xT0JCSUFlL2lwT3B0VklWM3l5N1pMbGxvRkhndVBXcDlIYUpmdE5WTkp4YkZGeHZ1a29UaVR0SnFpUEY4cz0iLCJtYWMiOiJiOWJiMWQ5MmVkNTdhYTdkMmYyMzVjYTFkODUwZGUyN2QwZWE3MjRmM2Y5ZTUyZTlkZjY4MWU5OGFmZTg4Y2M1IiwidGFnIjoiIn0"
            }
        });
        if (response.ok) {
            let doc = response.html();
            let comiclist = [];
            doc.select(".table.list-bookmark tbody tr").forEach(e => {
                comiclist.push({
                    name: e.select(".item-thumb a").attr("title"),
                    link: e.select(".item-thumb a").attr("href"),
                    cover: e.select(".item-thumb a img").attr("src"),
                    description: e.select('.post-on').first().text(),
                    host: "https://sayhentai.fun"
                });
            });
            return Response.success(comiclist);
        }
    } else {
        if (!page) page = '1';
        let response = fetch(url, {
            method: "GET",
            queries: {
                page: page
            }
        });
        if (response.ok) {
            let doc = response.html();
            let comiclist = [];
            let next = doc.select(".pager").select('li.active + li').text();
            doc.select(".page-item-detail").forEach(e => {
                comiclist.push({
                    name: e.select("h3 a").text(),
                    link: e.select("h3 a").attr("href"),
                    cover: e.select("img.img-responsive").attr("data-src") || e.select("img.img-responsive").attr("src"),
                    description: e.select('.chapter').first().text(),
                    host: "https://sayhentai.fun"
                });
            });
            return Response.success(comiclist, next);
        }
    }
    return null;
}