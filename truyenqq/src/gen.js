function execute(url, page) {
    let baseUrl = 'https://truyenqqhot.com'
    if (!page) page = '1';
    url = url.replace(".html", "") + "/trang-" + page + ".html";
    var doc = fetch(baseUrl + url).html();

    if (doc) {
        var novelList = [];
        var next = doc.select(".page_redirect").select("a:has(p.active) + a").last().text();
        doc.select("#main_homepage .list_grid li").forEach(e => {
            var cover = e.select(".book_avatar img").attr("src");
            if (cover.startsWith("//")) {
                cover = "http:" + cover;
            }
            novelList.push({
                name: e.select(".book_name").text(),
                link: e.select(".book_name a").first().attr("href"),
                description: e.select(".last_chapter").text(),
                cover: cover,
                host: baseUrl
            });
        })

        return Response.success(novelList, next)
    }

    return null;
}