function execute() {
    let response = fetch('http://178.128.101.190:8000');
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select('.genres li a').forEach(e => data.push({
            title: e.text(),
            input: e.attr('href'),
            script: 'gen.js'
        }));
        return Response.success(data);
    }
    return null;
}