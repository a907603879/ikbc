define(['jquery'], function ($) {
    
    // 导航产品列表
    function navlist(){
        $.ajax({
            url:"../data/data.json",
            success:function(arr){
                var navList1 = arr[3].index;
                var navList2 = arr[4].index;
                var navList3 = arr[5].index;
                for(let i = 0; i < navList1.length; i++){
                    $(`<li><a href="http://localhost:2222/list.html#"><img src="${navList1[i].img}" alt="${navList1[i].title}">
                    <span>${navList1[i].title}</span></a></li>`).appendTo($('.xn_list_mainera'))
                };
                for(let i = 0; i < navList2.length; i++){
                    $(`<li><a href="http://localhost:2222/list.html#"><img src="${navList2[i].img}" alt="${navList2[i].title}">
                    <span>${navList2[i].title}</span></a></li>`).appendTo($('.xn_list_mainerb'))
                };
                for(let i = 0; i < navList3.length; i++){
                    $(`<li><a href="http://localhost:2222/list.html#"><img src="${navList3[i].img}" alt="${navList3[i].title}">
                    <span>${navList3[i].title}</span></a></li>`).appendTo($('.xn_list_mainerc'))
                };
            },
            error:function(msg){
            },
        })
    }
    // 导航栏点击
    function navChick(){
        $(function(){
            // 1
            $(".header_main").on("mouseenter",".xn_index_ul li:nth-child(1)",function(){
                $(".xn_list_mainera").css("display","block");
                $(".xn_list").css("height","140px");
                $(".xn_list_mainerb").css("display","none");
                $(".xn_list_mainerc").css("display","none");
                $(".xn_index_ul li a").removeClass("nav_active")
                $(".xn_index_ul li:nth-child(1) a").addClass("nav_active");
            })
            $(".xn_list").mouseleave(function(){
                $(".xn_list_mainera").css("display","none");
                $(".xn_list").css("height","0");
                $(".xn_index_ul li a").removeClass("nav_active")
            })
            // 2
            $(".header_main").on("mouseenter",".xn_index_ul li:nth-child(2)",function(){
                $(".xn_list_mainerb").css("display","block");
                $(".xn_list").css("height","140px");
                $(".xn_list_mainerc").css("display","none");
                $(".xn_list_mainera").css("display","none");
                $(".xn_index_ul li a").removeClass("nav_active")
                $(".xn_index_ul li:nth-child(2) a").addClass("nav_active");
            })
            $(".xn_list").mouseleave(function(){
                $(".xn_list_mainerb").css("display","none");
                $(".xn_list").css("height","0");
                $(".xn_index_ul li a").removeClass("nav_active")
            })
            // 4
            $(".header_main").on("mouseenter",".xn_index_ul li:nth-child(4)",function(){
                $(".xn_list_mainerc").css("display","block");
                $(".xn_list").css("height","140px");
                $(".xn_list_mainerb").css("display","none");    
                $(".xn_list_mainera").css("display","none");
                $(".xn_index_ul li a").removeClass("nav_active")
                $(".xn_index_ul li:nth-child(4) a").addClass("nav_active");
            })
            $(".xn_list").mouseleave(function(){
                $(".xn_list_mainerc").css("display","none");
                $(".xn_list").css("height","0");
                $(".xn_index_ul li a").removeClass("nav_active")
            })
        })
    }
    // 轮播图
    function banner() {
        $(function () {
            var tBtn = $(".banner_btn").find("li");
            var oUL = $(".ik_banner").find("ul");
            var lrBtn = $(".ltbtn").find("p");
            var iNow = 0;
            var timer = null;

            tBtn.click(function () {
                iNow = $(this).index();
                tab();
            })

            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2000)

            $(".ik_banner").mouseenter(function () {
                clearInterval(timer);
            }).mouseleave(function () {
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 2000)
            })

            lrBtn.eq(0).click(function () {
                iNow--;
                tab();
            })
            lrBtn.eq(1).click(function () {
                iNow++;
                tab();
            })

            lrBtn.mouseenter(function(){
                $('.ltbtn p').css("opacity","1")
            })
            lrBtn.mouseleave(function(){
                $('.ltbtn p').css("opacity","0.3")
            })

            function tab() {
                tBtn.removeClass("btn_active");
                if (iNow == tBtn.size()) {
                    tBtn.eq(0).addClass("btn_active");
                } else if (iNow == (-1)) {
                    tBtn.eq(tBtn.size() - 1).addClass("btn_active")
                } else {
                    tBtn.eq(iNow).addClass("btn_active")
                }
                oUL.animate({ left: (iNow * -1200) - 1200 }, 500, function () {
                    if (iNow == tBtn.size()) {
                        iNow = 0;
                        oUL.css('left', -1200);
                    }
                    if (iNow == (-1)) {
                        iNow = tBtn.size() - 1;
                        oUL.css('left', -4800);
                    }
                })
            }
        })
    }
    // 产品
    function indexlist() {
        $.ajax({
            url: "../data/data.json",
            success: function (arr) {
                var indexL = arr[0].index;
                for (let i = 0; i < indexL.length; i++) {
                    $(`<li><a href="http://localhost:2222/detail.html#"><img src="${indexL[i].img}" alt="${indexL[i].title}"></a></li>`).appendTo($(".bn_list_pr"))
                }
            },
            error: function (msg) {
            }
        })
    }
    return {
        indexlist: indexlist,
        navlist:navlist,
        navChick:navChick,
        banner:banner,
    }
})