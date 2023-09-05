function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.fun", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.fun/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.fun/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.fun/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.fun/user/bookmark", script: "gen.js" },
    ]);
}