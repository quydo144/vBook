function execute(url) {
    let baseUrl = 'https://truyenqqhot.com'
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, baseUrl);

    var doc = fetch(url).html();

    var regex = /document.cookie="(.*?)"/;
    var cookie = regex.exec(doc);

    if (cookie) {
        doc = fetch(url, {
            method: "GET",
            headers: {
                "Cookie": cookie[1] + '; visit-read=63baf14d03a33-63baf14d03a35'
            }
        }).html();
    }

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