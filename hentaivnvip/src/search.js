function execute(key, page) {
    let response = fetch('https://hentaivnvip.net/truyen-hentai-moi/?q=' + key, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=UTF-8",
            "User-Agent": "PostmanRuntime/7.29.0"
        }
    });
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".comics-grid .entry");
        let data = [];
        el.forEach(e => data.push({
            name: e.select("a.name").first().text(),
            link: e.select("a.name").first().attr("href"),
            cover: e.select("img").first().attr("src"),
            description: e.select(".date-time").first().text(),
            host: "https://hentaivnvip.net"
        })
        );
        return Response.success(data);
    }
    return null;
}