define(['jquery'], function ($) {
    function listlist() {
        $.ajax({
            url: "../data/data.json",
            success: function (arr) {
                var listL = arr[1].index;
                for (let i = 0; i < listL.length; i++) {
                    $(`<li><div class="mainer_img"><a href="http://localhost:2222/detail.html#"><img src="${listL[i].img}" alt="${listL[i].title}"><span>${listL[i].title}</span></a></div><div class="mainer_text"><span>${listL[i].text}</span></div></li>`).appendTo($(".mainer_list"))
                }
            },
            error: function (msg) {
            }
        })
    }
    return {
        listlist: listlist,
    }
})