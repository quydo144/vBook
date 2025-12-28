load('config.js');
function execute(url, page) {
    if (url.includes("bookmark")) {
        let response = fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html; charset=UTF-8",
                "User-Agent": "PostmanRuntime/7.29.0",
                "cookie": 'remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6ImdqdGhxeVhkSUwxbXQ2dFlhSFNNUGc9PSIsInZhbHVlIjoiWGxWU2piZHBLSUk0VU5HdEtNTzl6RmI3OU1NdGw4Wng2OEFYUW5RelUwZk9BNlBRdFJQK3A1Q3JHRWIxMm5wV1o1SDR6WGdIdFlBbHdOcUpXZnFBM2trYm5ab3VwenNPbmNiZzYyY0dWWDVUaXdqMkh4WlQrL2ZnYjI2eWNkSjY0UzFxZktrL2t5S1Vxa015TURUdlRRb2NsbXNNbmJVd2pKbC9BaFNnUVdLNVNaUHp1QXhXd2p1clNENjVPWVhJVnBkVWN6UzZjK3lTVnpDdWRnNnBYbHdHSXp0b2VlemFTRzF2Zm41S2tJRT0iLCJtYWMiOiI3OGU2NGM5YzY5ZWJmNTU5N2E0M2YzMDI0ZjU5YmU5ZDZiNWJkY2U0OGVjZGZmY2VhZWNlYzgwNGY2N2ZmZWJkIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IjB6SHZLZDVRREhUSXcyMUJiREtrOXc9PSIsInZhbHVlIjoidTBCUkdURExZRXNUNk83RzN4WGpwcVpJUFhaRlV1bm11cjF0dGpETjRoOThRZU82U0lDVEYxcFl2UGpsWHoxcElQL04rNnBSRDVZOVVoVkpMY2NEOENXSjVKQndHOXJEQTRYdWRicCtXeEx1WHV4aSt5bDhrSnNZWDdyMUpJc0kiLCJtYWMiOiIyNGViYzViZjNmZmVmMTVjN2Q0MWY1YTE0NWVmMTM5YThmYjU3ZTM3MTUyNTA4ZTJjMzQ1NzYwY2VlYjQxNTZjIiwidGFnIjoiIn0%3D; sayhentai_session=eyJpdiI6IktqU3NFbkdvZ1M2UHFwNkNIS1R3VkE9PSIsInZhbHVlIjoid3F1V2FCU0xMNGo1M3J0bk9JclQwR1JDRzJYUkIyME41cHRObzczWjRtbnBVeTQxeVl1cnlXOGljakZhQUtvTzUwRyt0NUh4K0I1ZExIK1p1RmhpQ2xNM0pEb094OG1rVWtKK1lUTTN5eWFLVy9CcGFmTXVnN1ovMjkrcGErcGoiLCJtYWMiOiI4ZjJmOGNlN2Y5NzQwYTUzYzMwNGJiN2FhODlmMTlmMzc1ZDA3ZWNlMjYyZDYwYjRmMGY1MDI2YTMyZWE2MGE1IiwidGFnIjoiIn0%3D'
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