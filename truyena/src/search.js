function execute(key, page) {
    const doc = fetch('https://truyena.net/index.php?search='+key).html()
    const el = doc.select(".story-list .row")
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.select(".story-list-title").first().text(),
            link: e.select(".story-list-title a").first().attr("href"),
            cover: 'https://truyena.net'+e.select(".imgThumb img").first().attr("src"),
            description: e.select("a[href~=tac-gia]").first().text(),
            host: "https://truyena.net"
        })
    }
    return Response.success(data)
}