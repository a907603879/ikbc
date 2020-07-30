define(['jquery'], function ($) {
    // 登录
    function download() {
        $('.login_user button').click(function () {
            $.ajax({
                type: "post",
                url: "./php/login.php",
                data: {
                    username: $(".login_msg input")[0].value,
                    password: $(".login_msg input")[1].value,
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    $(".lg_alert").css('display', "block")
                    if (obj.code) {
                        $(".lg_alert").addClass("alert_danger");
                        $(".lg_alert").html(obj.msg);
                    } else {
                        $(".lg_alert").addClass("alert_success");
                        $(".lg_alert").html(obj.msg);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        });
    }
    // 判断注册信息
    function isYes() {
        $(function () {
            var isYes = true;
            $(".username").focus(function () {
                $(".hUsername").css("display", "block");
                $(".hUsername").html('6～18个字符，可使用字母、数字、下划线，需要以字母开头');
            })
            $(".username").blur(function () {
                let oValue = this.value;
                if (!oValue) {
                    $(".hUsername").css("display", "none")
                    isYes = false;
                } else {
                    if (oValue.length > 18 || oValue.length < 6) {
                        $(".hUsername").html('！长度应为6～18个字符');
                        $(".hUsername").addClass("warning");
                        isYes = false;
                    } else if (!/[a-zA-Z]/.test(oValue[0])) {
                        $(".hUsername").html('！邮箱地址需以字母开头');
                        $(".hUsername").addClass("warning");
                        isYes = false;
                    } else if (/\W/.test(oValue)) {
                        $(".hUsername").html('！！只能输入字母、数字、下划线')
                        $(".hUsername").addClass("warning");
                        isYes = false;
                    } else {
                        $(".hUsername").html('✅恭喜，该邮件地址可以注册')
                        $(".hUsername").addClass("success");
                        isYes = true;
                    }
                }
            })
            $(".password").focus(function () {
                $(".hPassword").css("display", "block");
                $(".hPassword").html('6～16个字符，区分大小写');
            })
            $(".password").blur(function () {
                let oValue = this.value;
                if (!oValue) {
                    $(".hPassword").css("display", "none")
                    isYes = false;
                } else {
                    if (oValue.length > 18 || oValue.length < 6) {
                        $(".hPassword").html('！长度应为6～18个字符');
                        $(".hPassword").addClass("warning");
                        isYes = false;
                    } else if (/\W/.test(oValue)) {
                        $(".hPassword").html('！！只能输入字母、数字、下划线')
                        $(".hPassword").addClass("warning");
                        isYes = false;
                    } else {
                        $(".hPassword").html('✅恭喜，密码可以使用')
                        $(".hPassword").addClass("success");
                        isYes = true;
                    }
                }
            })
            $(".bPassword").focus(function () {
                $(".hbPassword").css("display", "block");
            })
            $(".bPassword").blur(function () {
                let oValue = this.value;
                if (!oValue) {
                    $(".hbPassword").css("display", "none")
                    isYes = false;
                } else {
                    isYes = true;
                }
            })
        })
    }
    //注册
    function register() {
        $('.banner_register button').click(function () {
            $.ajax({
                type: "post",
                url: "./php/register.php",
                data: {
                    username: $(".banner_msg input")[0].value,
                    password: $(".banner_msg input")[1].value,
                    repassword: $(".banner_msg input")[2].value,
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    $(".re_alert").css("dispaly", "block");
                    if (obj.code) {
                        $(".re_alert").addClass("alert_danger");
                        $(".re_alert").html(obj.msg);
                    } else {
                        $(".re_alert").addClass("alert_success");
                        $(".re_alert").html(obj.msg);
                        setTimeout(() => {
                            location.assign("login.html")
                        }, 500)
                    }
                    console.log("succ")
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        });
    }
    // 切换页面
    function relo() {
        $(".btn_log a").click(function () {
            $(".login_user").css("display", "block")
            $(".banner_register").css("display", "none")
        })
        $(".btn_res a").click(function () {
            $(".login_user").css("display", "none")
            $(".banner_register").css("display", "block")
        })
    };
    return {
        download: download,
        relo: relo,
        register: register,
        isYes: isYes,
    };
})