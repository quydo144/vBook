function execute(url) {
    let response = fetch(url, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=UTF-8",
            "User-Agent": "PostmanRuntime/7.29.0"
        }
    });
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".chap-list a")
        let list = [];
        for (var i = el.size() - 1; i >= 0; i--) {
            var e = el.get(i);
            list.push({
                name: e.select('span').first().text(),
                url: e.attr("href"),
                host: "https://hentaivnhot.com"
            })
        }
        return Response.success(list);
    }
    return null;
}