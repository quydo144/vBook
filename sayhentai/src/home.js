function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.one", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.one/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.one/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.one/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.one/user/bookmark", script: "gen.js" },
    ]);
}