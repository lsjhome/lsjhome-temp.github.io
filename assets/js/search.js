! function() {
    function e(e, t) {
        var n = document.getElementById("search-results");
        if (e.length) {
            for (var o = "", r = 0; r < e.length; r++) {
                var i = t[e[r].ref];
                o += '<p class="result-item">'+ '<a href="' + i.url + '"><h3 class="result-title">' + i.title + "</h3></a>", o += "<p class='result-contents'>" + i.content.substring(0, 150) + "...</p>" + '</p>' + '<br>'
            }
            n.innerHTML = o
        } else n.innerHTML = "<h2>No results found.</h2>"
    }

    function t(e) {
        for (var t = window.location.search.substring(1), n = t.split("&"), o = 0; o < n.length; o++) {
            var r = n[o].split("=");
            if (r[0] === e) return decodeURIComponent(r[1].replace(/\+/g, "%20"))
        }
    }
    var n = t("query");
    if (n) {
        document.getElementById("search-box").setAttribute("value", n);
        var o = new lunr.Index;
        o.field("id"), o.field("title", {
            boost: 10
        }), o.field("author"), o.field("category"), o.field("content"), console.log(o);
        for (var r in window.store) {
            o.add({
                id: r,
                title: window.store[r].title,
                author: window.store[r].author,
                category: window.store[r].category,
                content: window.store[r].content
            });
            var i = o.search(n);
            e(i, window.store)
        }
    }
}();
