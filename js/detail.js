define(['parabola', 'jquery', 'jquery-cookie'], function (parabola, $) {
    // 数据导入
    function detail() {
        console.log("详情加载")
        $.ajax({
            url: "../data/data.json",
            success: function (arr) {
                var indexL = arr[2].index;
                for (let i = 0; i < indexL.length; i++) {
                    $(`<li><img src="${indexL[i].img}" alt="${indexL[i].title}"></li>`).appendTo($(".wr_main_inf ul"))
                }
            },
            error: function (msg) {
            }
        })
    };
    // 切换图片
    function deClick() {
        $(function () {
            var btn = $(".mainer_img_banner").find("li");
            var show = $('.mainer_img');
            var iNow = 0;
            btn.click(function () {
                iNow = $(this).index();
                tab();
            });
            $(".btn_l").click(function () {
                iNow--;
                tab();
            })
            $(".btn_r").click(function () {
                console.log(iNow)
                iNow++;
                tab();
            })
            function tab() {
                if (iNow == btn.length) {
                    iNow = 0;
                };
                if (iNow == -1) {
                    iNow = btn.length - 1;
                };
                btn.removeClass('mainer_img_active').eq(iNow).addClass("mainer_img_active");
                $('.mainer_img img').remove().add(btn.eq(iNow).find('a img').clone().appendTo($(".mainer_img")));
                $('.mainer_mag img').remove().add(btn.eq(iNow).find('a img').clone().appendTo($(".mainer_mag")));
            }
        })
    };
    // 放大镜
    function magnifying() {
        $(function () {
            $(".mainer_img").mouseenter(function () {
                $(".mainer_mag,.img_shade").show();
            }).mouseleave(function () {
                $(".mainer_mag,.img_shade").hide();
            }).mousemove(function (ev) {
                var l = ev.pageX - $(".mainer_img").offset().left - 100;
                //限制出界
                if (l <= 0) {
                    l = 0;
                }
                if (l >= 250) {
                    l = 250;
                }
                var t = ev.pageY - $(".mainer_img").offset().top - 100;
                if (t <= 0) {
                    t = 0;
                }
                if (t >= 250) {
                    t = 250;
                }
                $(".img_shade").css({
                    left: l,
                    top: t,
                })
                $(".mainer_mag img").css({
                    left: -2 * l,
                    top: -2 * t
                })
            })

        })
    };
    // 加入购物车
    function addShopping() {
        $(".btn_add").click(function () {
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                var arr = [{ id: id, num : 1 }];
                $.cookie("goods", JSON.stringify(arr), { expires: 7 });
            } else {
                var cookieArr = JSON.parse($.cookie("goods"));
                var findIndex = cookieArr.findIndex((item) => item.id == id);
                if (findIndex == -1) {
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj);
                } else {
                    cookieArr[findIndex].num++;
                }
                $.cookie('goods', JSON.stringify(cookieArr), { expires: 7 });
            }
            sc_num();
        })
    }
    // 统计总数
    function sc_num() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            $(".shopping_car a p").html(0);
        } else {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".shopping_car a p").html(sum);
        }
    }
    return {
        detail: detail,
        deClick: deClick,
        magnifying: magnifying,
        addShopping:addShopping,
    }
})