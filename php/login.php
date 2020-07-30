<?php
    header('content-type:taxt/html';charset='utf-8');

    $responseData = array('code' => 0,'msg' => '');

    // 数据校验
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 判断用户是否存在
    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = '用户名不能为空';
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = '密码不能为空';
        echo json_encode($responseData);
        exit;
    }
    // 连接数据库
    $link = mysqli_connect('localhost','root','123456');

    if(!$link){
        $responseData['code'] = 4;
        $responseData['msg'] = '服务器忙';
        echo json_encode($responseData);
        exit;
    }

    mysqli_set_charset($link,'utf8');
    // 选择数据库
    mysqli_select_db($link,'ikbc');
    // 加密
    $str = md5(md5(md5($password).'ikbc').'ikbcc');
    // 登录
    $sql = "SELECT * FROM ikbc_name WHERE username='{$username}' AND password='{$str}'";

    $res = mysqli_query($link,$sql);

    $row = mysqli_fetch_assoc($res);

    if(!$row){

        $responeData['msg'] = '登陆成功';
        echo json_encode($responseData);
    }else{
        $responseData['code'] = 5;
        $responseData['msg'] = '用户名或密码错误';
        echo json_encode($responseData);
        exit;
    }

    mysqli_close($link)
?>