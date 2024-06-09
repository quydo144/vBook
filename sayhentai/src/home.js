function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.life", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.life/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.life/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.life/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.life/user/bookmark", script: "gen.js" },
    ]);
}