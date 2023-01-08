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

    if (doc) {
        var imgs = doc.select(".chapter_content img.lazy");
        var data = [];
        for (var i = 0; i < imgs.size(); i++) {
            var e = imgs.get(i)
            data.push({link: e.attr("src")});
        }
        return Response.success(data);
    }
    return null;
}