function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.live", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.live/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.live/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.live/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.live/user/bookmark", script: "gen.js" },
    ]);
}