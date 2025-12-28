load('config.js');
function execute() {
    return Response.success([
        { title: "Cập Nhật", input: BASE_URL, script: "gen.js" },
        { title: "Manhwa", input: BASE_URL + "/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: BASE_URL + "/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: BASE_URL + "/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: BASE_URL + "/user/bookmark", script: "gen.js" },
    ]);
}