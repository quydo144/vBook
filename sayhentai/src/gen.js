load('config.js');
function execute(url, page) {
    if (url.includes("bookmark")) {
        let response = fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html; charset=UTF-8",
                "User-Agent": "PostmanRuntime/7.29.0",
                "cookie": 'remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IjBBcnRScUczZ0NZUUc2aFRRYUZienc9PSIsInZhbHVlIjoiLzhrUGYwLzY1SkFxT2llV0NiN01FbzVITWZ2dm8vSnhGanA0N2lhN0dHNVp4M1BBWnlBSldSc1VhL1VSNG12RHp6L3NTYS9sSGp5bDhDRXk0YVZkMTZ1VkZnbUVJcHg1QzdFSS9iWXNyc2xWSzBnQVR0NzU0ZmcraC93anZtdlpLQW9haFJjc2VqSEZJdGtIMjRUQWRSVkdnTEUrV20wTGgzRFFlcG15eE16cUQ4UFFjYW43TVZwK3J1UU5DbFNuU1JXWUhHeWREbEt5anJBNzRBUEZYajFCZGNlcEVVYjB1b1FuQUpTR0xUND0iLCJtYWMiOiJmZTk1ZWMyYjQ3OWZkMTg1YzI4NjA5ZDYxZDgwNzM4N2Y1MDVkMWUwZjI3MmQ5YTgxZTZhMWM0NGVhZTViNTYyIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6InlzeEhWT1Z6VkZsOTNLVlZSLzI3Vmc9PSIsInZhbHVlIjoiaWwwZklnTzgzVjNMWWI0c0Foald4dC9IMUlrcUEwZFpXaVRSOHZKVk1Sdm9DZjZlY1F5NnFGMU1ZYWhMSEpoUFQ4RFNaQXJCSXl1R0RocnFsUmdEU0xwSExYSzBiTnFaR09VQUY5WVNpVVQ5MGkva3RiUHVEbnVaS0RFZGwyRFEiLCJtYWMiOiJhNzVmZTg1OGI3MWU2YzQxNDE4ZWQxMDNmNTJjODhmMzBkMzJiMTYxZWUzZDliZDcwNDg0YjUwMjA2N2NmNjZhIiwidGFnIjoiIn0%3D; sayhentai_session=eyJpdiI6Im9jaFFxVVhJUys2UndJSlowYkN5dGc9PSIsInZhbHVlIjoiWWY2TVJhV3UwdWozM0cyTWpVTFEzV0lPK28xaExJL3RqTzVYL2QwUXVUT09rc1E0bTRpRWc4OHVua2piVGNpWDJQSG94alUzb0gvWG9ZTitjQnNpY0RRTnV4M1V2bnZ2NWVtQ2YzbUtXekIvSFE2ck9NY0p1dTR3K3RUQWVZd0UiLCJtYWMiOiIwMTQ1MGQwODNjNTdkNThlYTJlMWIxMTQ1ZDcwZDM2YmRjNTE3YmI4NmU2NmJhZTE4YzFiZmZlNzc0YWU3MzZiIiwidGFnIjoiIn0%3D'
            }
        });
        if (response.ok) {
            let doc = response.html();
            let comiclist = [];
            doc.select(".table.list-bookmark tbody tr").forEach(e => {
                comiclist.push({
                    name: e.select(".item-thumb a").attr("title"),
                    link: e.select(".item-thumb a").attr("href").replace(/^https?:\/\/[^/]+/, BASE_URL),
                    cover: e.select(".item-thumb a img").attr("src"),
                    description: e.select('.post-on').first().text(),
                    host: BASE_URL
                });
            });
            return Response.success(comiclist);
        }
    } else {
        if (!page) page = '1';
        let response = fetch(url, {
            method: "GET",
            queries: {
                page: page
            }
        });
        if (response.ok) {
            let doc = response.html();
            let comiclist = [];
            let next = doc.select(".pager").select('li.active + li').text();
            doc.select(".page-item-detail").forEach(e => {
                comiclist.push({
                    name: e.select("h3 a").text(),
                    link: e.select("h3 a").attr("href").replace(/^https?:\/\/[^/]+/, BASE_URL),
                    cover: e.select("img.img-responsive").attr("data-src") || e.select("img.img-responsive").attr("src"),
                    description: e.select('.chapter').first().text(),
                    host: BASE_URL
                });
            });
            return Response.success(comiclist, next);
        }
    }
    return null;
}