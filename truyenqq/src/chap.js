function execute(url) {
    let baseUrl = 'https://truyenqqhot.com'
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, baseUrl);
    var doc = fetch(url).html();
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