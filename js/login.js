/**
 * Created by lpf on 2017/6/10.
 */

/*function addCookie(name,value,days,path){   /!**添加设置cookie**!/
var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + days * 3600000 * 24);
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
    path = path == "" ? "" : ";path=" + path;
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC
    //参数days只能是数字型
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
}
function getCookieValue(name){  /!**获取cookie的值，根据cookie的键获取值**!/
    //用处理字符串的方式查找到key对应value
var name = escape(name);
    //读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;
    //查找名为name的cookie的开始位置
    name += "=";
    var pos = allcookies.indexOf(name);
    //如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
        var start = pos + name.length;                  //cookie值开始的位置
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
        var value = allcookies.substring(start,end); //提取cookie的值
        return (value);                           //对它解码
    }else{  //搜索失败，返回空字符串
        return "";
    }
}

function deleteCookie(name,path){   /!**根据cookie的键，删除cookie，其实就是设置其失效**!/
var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
}

window.onload = function(){
    var userNameValue = getCookieValue("userName");
    document.getElementById("user_name").value = userNameValue;
    var userPassValue = getCookieValue("userPass");
    document.getElementById("user_password").value = userPassValue;
}
if(objChk.checked){
    //添加cookie
    addCookie("username",username,30,"/");
    addCookie("password",password,30,"/");
    window.location.href = "index.html";
}else{
    /!*  window.location.href = "http://www.baidu.com";*!/
}*/

function login(){

    var username = $("#user_name").val();
    var password = $("#user_password").val();
  /*  var objChk = document.getElementById("chkRememberPass");*/

    if(username == "" || username == null){
       $("#user_name").attr("placeholder" ,"用户名为空，请输入用户名！");
        return false;
    }
    if(password == "" || password == null){
        $("#user_password").attr("placeholder" ,"密码为空，请输入用户名！");
        return false;
    }

    //后台验证提交
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/checklogin",
        data: {
            username:username,
            password:password
        },
        dataType:"json",
        success:function(state){
             if(state.state == 1){
                $("#user_name").attr("placeholder" ,"用户未注册，请注册！");
             }else if(state.state==2){
                $("#user_password").attr("placeholder" ,"密码错误，请重新输入！");
             }else if(state.state==3){
                 window.location.href = "index.html";
             }else if(state.state==4){
                 window.location.href = "index.html";
             }else if(state.state==5){
                 alert("用户已注册，未通过审核，等待审核！");
             }
        }
    });

}