function execute(url) {
    let doc = fetch(url).html();
    let el = doc.select(".chapter-content img");
    let imgs = [];
    for (let i = 0; i < el.size(); i++) {
        let e = el.get(i);
        let img = e.attr("src");
        if (!img.match(/credit|hentaivn/)){
            imgs.push(img)
        }
    }
    return Response.success(imgs);
}