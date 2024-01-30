function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "https://sayhentai.club", script: "gen.js" },
        { title: "Manhwa", input: "https://sayhentai.club/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "https://sayhentai.club/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "https://sayhentai.club/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "https://sayhentai.club/user/bookmark", script: "gen.js" },
    ]);
}