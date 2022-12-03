function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url + '/page/' + page);
    if (response.ok) {
        let doc = response.html();
        let next = doc.select('.z-pagination').select('span.current + a').text();
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
        return Response.success(data, next);
    }
    return null;
}