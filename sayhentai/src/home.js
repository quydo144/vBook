function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.me", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.me/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.me/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.me/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.me/user/bookmark", script: "gen.js" },
    ]);
}