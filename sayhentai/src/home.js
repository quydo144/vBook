function execute() {
    return Response.success([
        { title: "Cập Nhật", input: "http://178.128.101.190:8000", script: "gen.js" },
        { title: "Manhwa", input: "http://178.128.101.190:8000/genre/manhwa", script: "gen.js" },
        { title: "Manga", input: "http://178.128.101.190:8000/genre/manga", script: "gen.js" },
        { title: "Hoàn Thành", input: "http://178.128.101.190:8000/completed", script: "gen.js" },
        { title: "Đang theo dõi", input: "http://178.128.101.190:8000/user/bookmark", script: "gen.js" },
    ]);
}