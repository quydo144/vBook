function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.ink", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.ink/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.ink/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.ink/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.ink/user/bookmark", script: "gen.js" },
    ]);
}