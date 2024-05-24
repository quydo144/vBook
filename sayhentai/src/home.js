function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.co", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.co/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.co/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.co/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.co/user/bookmark", script: "gen.js" },
    ]);
}