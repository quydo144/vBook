function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://www.sayhentai.live", script: "gen.js" },
        { title: "Manhwa", input: "https://www.sayhentai.live/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://www.sayhentai.live/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://www.sayhentai.live/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://www.sayhentai.live/user/bookmark", script: "gen.js" },
    ]);
}