function execute(url) {
    const nUrl = url.replace('m.','www.');
    const doc = Http.get(nUrl).html();
    var el = doc.select('dt:nth-child(14) ~ *').select('a')
    const data = [];
    el.forEach(e => {
        data.push({
            name: e.text(),
            url: e.attr('href'),
            host: "https://www.wusanzw.com"
        })
    });
    return Response.success(data);
}