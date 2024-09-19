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
        var imgs = doc.select(".chapter_content img.lazy");
        var data = [];
        for (var i = 0; i < imgs.size(); i++) {
            var e = imgs.get(i)
            data.push({ link: e.attr("src") });
        }
        return Response.success(data);
    }
    return null;
}