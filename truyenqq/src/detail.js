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
        var cover = doc.select(".book_avatar img").first().attr("src");
        if (cover.startsWith("//")) {
            cover = "http:" + cover;
        }
        return Response.success({
            name: doc.select("h1[itemprop=name]").text(),
            cover: cover,
            host: baseUrl,
            author: doc.select("a.org").text(),
            description: doc.select("div.story-detail-info").html(),
            detail: doc.select(".book_info div.txt").first().html(),
            ongoing: doc.select(".book_info div.txt").html().indexOf("Đang Cập Nhật") >= 0
        });
    }

    return null;
}