$(function() {
    function getGoodList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
            if (res.status !== 200) {
                return alert("获取失败")
            }
            let rows = []
            $.each(res.data, function(index, item) {
                if (index > 100) {
                    return
                }
                rows.push(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.bookname}</td>
                    <td>${item.author}</td>
                    <td>${item.publisher}</td>
                    <td><a href="javascript:;" class="del" data-id="${item.id}">删除</a></td>
                </tr>
                `)
            })
            $('#tb').empty().append(rows.join(""))
        })

    }

    $('#tb').on('click', '.del', function() {
        let id = $(this).attr("data-id")
        $.get('http://www.liulongbin.top:3006/api/delbook', { id: id }, function(res) {
            if (res.status !== 200) {
                return alert("删除失败")
            }
            getGoodList()
        })
    })
    $('#btnAdd').on('click', function() {
        let bookname = $("#inName").val().trim()
        let author = $("#inPrice").val().trim()
        let publisher = $("#inAuthor").val().trim()
        $("#inName").val("")
        $("#inPrice").val("")
        $("#inAuthor").val("")
        console.log(bookname)
        if (bookname.length <= 0 || author.length <= 0 || publisher.length <= 0) {
            return alert("请填写完整信息")
        }
        $.post('http://www.liulongbin.top:3006/api/addbook', { bookname: bookname, author: author, publisher: publisher },
            function(res) {
                if (res.status !== 201) {
                    return alert("添加失败")
                }
                getGoodList()
            })
    })
})