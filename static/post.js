function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = function () {
    var ref = getParameterByName('ref');
    if (!ref == "")
        document.getElementById('ref-btn').children[0].href = "//" + ref;
    else
        document.getElementById('ref-btn').children[0].href = "//cryptoc1.github.io";

    fetch("//cryptoc1-blog.herokuapp.com/api/v1/posts/id/" + getParameterByName('id')).then(function (res) {
        res.text().then(function (data) {
            data = eval('(' + data + ')');
            var post = document.getElementById('post');
            post.children[0].innerHTML = marked(data.content);
            var d = document.createElement('div');
            d.className = "tags";

            // Uncomment to enable tags
            /*for (i in data.tags) {
                var a = document.createElement('a');
                a.href = "//cryptoc1.github.io/tags/index.html?tag=" + data.tags[i]
                a.innerHTML = data.tags[i];
                d.appendChild(a);
            }
            post.appendChild(d);*/
            document.getElementById('copy').innerHTML = "&copy;" + data.author;
        })
    }).catch(function (err) {
        console.log("error fetching: " + err);
    })
}