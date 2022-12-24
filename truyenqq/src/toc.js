function execute(url) {
    let baseUrl = 'https://truyenqqhot.com'
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, baseUrl);
    var doc = fetch(url).html();
    if(doc) {
        var list = [];
        var el = doc.select(".works-chapter-list a");
        for (var i = el.size() - 1; i >= 0; i--) {
            var e = el.get(i);
            list.push({
                name: e.text(),
                url: e.attr("href"),
                host: baseUrl,
            });
        }
        return Response.success(list);
    }

    return null;
}