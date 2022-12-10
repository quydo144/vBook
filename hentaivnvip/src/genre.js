function execute() {
    const response = fetch("https://hentaivnhot.com", {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=UTF-8",
            "User-Agent": "PostmanRuntime/7.29.0"
        }
    });
    if (response.ok) {
        let doc = response.html();
        const el = doc.select('ul.genre li a');
        const data = [];
        el.forEach(e => data.push({
            title: e.text(),
            input: e.attr('href'),
            script: 'gen.js'
        }));
        return Response.success(data);
    }
    return null;
}