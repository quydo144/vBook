function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.pro", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.pro/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.pro/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.pro/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.pro/user/bookmark", script: "gen.js" },
    ]);
}