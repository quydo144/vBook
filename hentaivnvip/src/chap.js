function execute(url) {
    let response = fetch(url, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=UTF-8",
            "User-Agent": "PostmanRuntime/7.29.0"
        }
    });
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".chapter-content img");
        let imgs = [];
        for (let i = 0; i < el.size(); i++) {
            let e = el.get(i);
            let img = e.attr("src");
            if (!img.match(/credit|hentaivn/)) {
                imgs.push(img)
            }
        }
        return Response.success(imgs);
    }
    return null;
}