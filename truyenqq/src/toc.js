function execute(url) {
    let baseUrl = 'https://truyenqqto.com'
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, baseUrl);

    var doc = fetch(url).html();

    var regex = /document.cookie="(.*?)"/;
    var cookie = regex.exec(doc);

    if (cookie) {
        doc = fetch(url, {
            method: "GET",
            headers: {
                "Cookie": cookie[1] + '; visit-read=63baf14d03a33-63baf14d03a35',
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58"
            }
        }).html();
    }

    if (doc) {
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