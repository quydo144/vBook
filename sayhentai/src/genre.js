load('config.js');
function execute() {
    let response = fetch(BASE_URL + '/genre');
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select('.page-genres li a').forEach(e => {
            const text = e.toString().replace(/<span[^>]*>.*?<\/span>/gi, "");
            const el = Html.parse(text);
            data.push({
                title: el.text(),
                input: el.select('a').attr('href').replace(/^https?:\/\/[^/]+/, BASE_URL),
                script: 'gen.js'
            })
        });
        return Response.success(data);
    }
    return null;
}