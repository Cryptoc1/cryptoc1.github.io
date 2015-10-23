window.onload = function () {
    fetch("//cryptoc1.herokuapp.com/api/v1/ext/posts/count").then(function (res) {
        if (res.status != 200) {
            console.log("error, status code: ", res.status);
            return;
        }
        res.text().then(function (count) {
            (function get(count, offset) {
                var limit = 100;
                fetch("//cryptoc1-blog.herokuapp.com/api/v1/posts?offset=" + offset + "&limit=" + limit).then(function (res) {
                    if (res.status != 200) {
                        console.log("error, status code: ", res.status);
                        return;
                    }
                    res.text().then(function (data) {
                        data = eval('(' + data + ')');
                        console.log(data)
                        var list = document.getElementById('list');
                        for (i in data) {
                            var d = document.createElement('div');
                            d.className = "link";
                            var s = document.createElement('span');
                            s.className = "date";
                            var date = Date(data[i].date.created * 1000).split(" ");
                            s.innerHTML = date[1] + " " + date[2] + ", " + date[3] + " :: ";
                            var a = document.createElement('a');
                            a.innerHTML = data[i].title
                            a.href = "/post/index.html?id=" + data[i]._id + "&ref=cryptoc1.github.io"
                            d.appendChild(s);
                            d.appendChild(a);

                            list.appendChild(d)
                        }
                        offset += limit;
                        if (offset <= count)
                            get(count, offset)
                    });
                }).catch(function (err) {
                    console.log("error fetching: " + err);
                });
            })(count, 0);
        });
    }).catch(function (err) {
        console.log("error fetching: " + err);
    });
}