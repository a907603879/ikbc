define(['jquery', 'jquery-cookie'], function ($) {
    // 全选框
    function check() {
        $(function () {
            var iYNum = 0;
            $('input').prop('checked', false);
            $('#allcheck').click(function () {
                let isYes = $(this).prop('checked');
                if (isYes) {
                    $(".checked").prop("checked", true)
                } else {
                    $(".checked").prop("checked", false)
                    iYNum = 0;
                }
            })
            $(".wr_shop_list").on("click", ".checked", function () {
                let isYes = $(this).prop("checked");
                let iNum = $(".checked").length;

                if (isYes) {
                    iYNum++;
                } else {
                    iYNum--;
                }
                console.log(this.checked)
                console.log(iYNum)
                if (iNum == iYNum) {
                    $("#allcheck").prop("checked", true)
                } else {
                    $("#allcheck").prop("checked", false)
                }
            })
        })
    }
    function sc_msg() {
        $.ajax({
            url: "../data/data.json",
            success: function (arr) {
                var proArr = arr[1].index;
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for (var i = 0; i < proArr.length; i++) {
                        for (var j = 0; j < cookieArr.length; j++) {
                            if (proArr[i].id == cookieArr[j].id) {
                                proArr[i].num = cookieArr[j].num;
                                newArr.push(proArr[i]);
                                break;
                            }
                        }
                    }
                    var str = ``;
                    for (var i = 0; i < newArr.length; i++) {
                        str += `<li id="${newArr[i].id}">
                        <input type="checkbox" class="checked">
                        <div class="first_list"><img src="${newArr[i].img}" alt="${newArr[i].text}">
                            <p>${newArr[i].text}</p>
                        </div>
                        <div class="last_list">
                            <div><span>￥${newArr[i].money}</span></div>
                            <div class="btn_num">
                                <p>-</p><span>${newArr[i].num}</span>
                                <p>+</p>
                            </div>
                            <div><span>￥${newArr[i].num * newArr[i].money}</span></div>
                            <div class="btn_remove">删除</div>
                        </div>
                    </li>`;
                    }
                    $('.wr_shop_list').html(str)

                }
            },
            error: function (msg) {
            }
        })
    }
    // 删除
    function rightBtnRemoveClick() {
        $(".wr_shop_list").on("click", ".btn_remove", function () {
            var id = $(this).closest('li').remove().attr("id");
            console.log(id)
            var cookieArr = JSON.parse($.cookie("goods"));
            cookieArr = cookieArr.filter((item) => item.id != id);

            cookieArr.length ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 }) : $.cookie("goods", null);
        })
    }
    // 添加减少
    function rightGoodsAdd_subtract() {
        $(".wr_shop_list").on("click", ".btn_num p", function () {
            var id = $(this).closest("li").attr('id');
            var cookieArr = JSON.parse($.cookie("goods"));
            var res = cookieArr.find((item) => item.id == id);
            if (this.innerHTML == '+') {
                res.num++;
            } else {
                res.num == 1 ? alert("数量为1，不能减少了") : res.num--;
            }
            $(this).siblings("span").html(`${res.num}`);
            $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 })
        })
    }
    // 清空
    function clearBtnHandleClick() {
        $(".clear_shop").click(function () {
            $.cookie("goods", null);
            $('.wr_shop_list').empty();
        })
    }

    return {
        check: check,
        rightBtnRemoveClick: rightBtnRemoveClick,
        rightGoodsAdd_subtract: rightGoodsAdd_subtract,
        clearBtnHandleClick: clearBtnHandleClick,
        sc_msg: sc_msg,

    }
})