function bypass(url, doc) {
    console.log(11111);
    var cookie = doc.html().match(/document.cookie="(.*?)"/);
    if (cookie) {
        cookie = cookie[1];
        doc = Http.get(url).headers({"Cookie": cookie}).html();
    }
    return doc
}