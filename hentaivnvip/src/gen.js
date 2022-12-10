function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url + '/page/' + page, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=UTF-8",
            "User-Agent": "PostmanRuntime/7.29.0"
        }
    });
    if (response.ok) {
        let doc = response.html();
        let next = doc.select('.z-pagination').select('span.current + a').text();
        let el = doc.select(".comics-grid .entry");
        console.log(el);
        let data = [];
        el.forEach(e => data.push({
            name: e.select("a").first().attr("title"),
            link: e.select("a").first().attr("href"),
            cover: e.select("img").first().attr("src"),
            description: e.select(".date-time").first().text(),
            host: "https://hentaivnhot.com"
        })
        );
        return Response.success(data, next);
    }
    return null;
}