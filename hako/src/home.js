function execute() {
    return Response.success([
        {
            title: "Mới cập nhật",
            script: "gen.js",
            input: "https://docln.net/danh-sach?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=capnhat"
        },
        {
            title: "Truyện mới",
            script: "gen.js",
            input: "https://docln.net/danh-sach?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=truyenmoi"
        },
        {
            title: "Theo dõi",
            script: "gen.js",
            input: "https://docln.net/danh-sach?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=theodoi"
        },
        {
            title: "Top toàn thời gian",
            script: "gen.js",
            input: "https://docln.net/danh-sach?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=top"
        },
        {
            title: "Top toàn thời gian isekai",
            script: "gen.js",
            input: "https://docln.net/the-loai/isekai?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=top"
        },
        {
            title: "Top toàn thời gian harem",
            script: "gen.js",
            input: "https://docln.net/the-loai/harem?truyendich=1&dangtienhanh=1&tamngung=1&hoanthanh=1&sapxep=top"
        },
    ]);
}
