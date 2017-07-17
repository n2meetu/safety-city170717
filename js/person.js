/**
 * Created by lpf on 2017/6/14.
 */
function getInfo(){
    var username='dsa0001425';
    // alert('ready');
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/personInformation",
        data: {
            username:username,
            action:1
        },
        dataType:"json",
        success:function(data){
            $("#userName").html(data.username);
            $("#Name").html(data.name);

            $("#job").html(data.job);
            $("#polygon").html(data.polygon);

            $("#job_number").html(data.job_number);
            $("#ID").html(data.id);

            $("#cellPhonespan").html(data.tel);
            $("#emailspan").html(data.email);
        }
    });
}


function usersubmit(){
    var mark = 0;
    var username = $("#userName").html();

    /* var name = $("#Name").html();
     var id=$("#ID").html();
     var polygon=$("#userPosition").html;
     var job_nubmber=$("#job_number").html();*/

    /* if(userName == "" || userName == null){
     $("#userNameDiv").css("display","block");
     mark++;
     }else{
     $("#userNameDiv").css("display","none");
     }
     var cardNo = $("#cardNo").val();
     if(cardNo == "" || cardNo == null){
     $("#cardNoDiv2").css("display","none");
     $("#cardNoDiv3").css("display","none");
     $("#cardNoDiv1").css("display","block");
     mark++;
     }else{
     if(validateIdCard(cardNo)){
     var param = {cardNo:cardNo};
     $.ajax({
     type:"post",
     url:"hotelUser/checkCardNo.ht",
     data:param,
     dataType:"json",
     success:function(data){
     if(data.flag == "1"){
     if(data.loginName == loginName){
     $("#cardNoDiv1").css("display","none");
     $("#cardNoDiv2").css("display","none");
     $("#cardNoDiv3").css("display","none");
     }else{
     $("#cardNoDiv1").css("display","none");
     $("#cardNoDiv3").css("display","none");
     $("#cardNoDiv2").css("display","block");
     mark++;
     }
     }else{
     $("#cardNoDiv1").css("display","none");
     $("#cardNoDiv2").css("display","none");
     $("#cardNoDiv3").css("display","none");
     }
     }
     });
     }else{
     $("#cardNoDiv1").css("display","none");
     $("#cardNoDiv2").css("display","none");
     $("#cardNoDiv3").css("display","block");
     mark++;
     }
     }*/
    var cellPhone = $("#tel").val();
    if(cellPhone == "" || cellPhone == null){
        $("#cellPhoneDiv2").css("display","none");
        $("#cellPhoneDiv1").css("display","block");
        mark++;
    }else{
        var pattern= /^1[358]\d{9}$/;
        if(!pattern.test(cellPhone)) {
            $("#cellPhoneDiv1").css("display","none");
            $("#cellPhoneDiv2").css("display","block");
            mark++;
        }else{
            $("#cellPhoneDiv1").css("display","none");
            $("#cellPhoneDiv2").css("display","none");
        }
    }

    var email = $("#email").val();
    if(email == "" || email == null){
        $("#emailDiv2").css("display","none");
        $("#emailDiv1").css("display","block");
        mark++;
    }else{
        var pattern = /^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,10}[.](com|cn|net)$/;
        if (!pattern.test(email)) {
            $("#emailDiv1").css("display","none");
            $("#emailDiv2").css("display","block");
            mark++;
        }else{
            $("#emailDiv1").css("display","none");
            $("#emailDiv2").css("display","none");
        }
    }
    if(mark > 0){
        return false;
    }else{
        alert("send");
        $.ajax({
            type:"post",
            url:"http://10.1.17.28:8090/safecity/personInformation",
            data: {
                action:2,
                username:username,
                tel:cellPhone,
                email:email
            },
            dataType:"json",
            success:function(data){
                alert(data.result);
                if(data.result=="ok"){

                    alert("修改用户信息成功！");

                }else{
                    alert("修改用户信息失败！");
                }
            }
        });
    }
}


/* function checkCardNo(){
 var loginName = $("#loginName").html();
 var cardNo = $("#cardNo").val();
 if(cardNo == "" || cardNo == null){
 $("#cardNoDiv2").css("display","none");
 $("#cardNoDiv3").css("display","none");
 $("#cardNoDiv1").css("display","block");
 return false;
 }else{
 if(validateIdCard(cardNo)){
 var param = {cardNo:cardNo};
 $.ajax({
 type:"post",
 url:"###########",
 data:param,
 dataType:"json",
 success:function(data){
 if(data.flag == "1"){
 if(data.loginName == loginName){
 $("#cardNoDiv1").css("display","none");
 $("#cardNoDiv2").css("display","none");
 $("#cardNoDiv3").css("display","none");
 }else{
 $("#cardNoDiv1").css("display","none");
 $("#cardNoDiv3").css("display","none");
 $("#cardNoDiv2").css("display","block");
 return false;
 }
 }else{
 $("#cardNoDiv1").css("display","none");
 $("#cardNoDiv2").css("display","none");
 $("#cardNoDiv3").css("display","none");
 }
 }
 });
 }else{
 $("#cardNoDiv1").css("display","none");
 $("#cardNoDiv2").css("display","none");
 $("#cardNoDiv3").css("display","block");
 return false;
 }
 }
 }*/

/* function checkUserName(){
 var userName = $("#userName").val();
 if(userName == "" || userName == null){
 $("#userNameDiv").css("display","block");
 return false;
 }else{
 $("#userNameDiv").css("display","none");
 }
 }*/

function checkCellPhone(){
    var cellPhone = $("#tel").val();
    if(cellPhone == "" || cellPhone == null){
        $("#cellPhoneDiv2").css("display","none");
        $("#cellPhoneDiv1").css("display","block");
        return false;
    }else{
        var pattern= /^1[358]\d{9}$/;
        if(!pattern.test(cellPhone)) {
            $("#cellPhoneDiv1").css("display","none");
            $("#cellPhoneDiv2").css("display","block");
            return false;
        }else{
            $("#cellPhoneDiv1").css("display","none");
            $("#cellPhoneDiv2").css("display","none");
        }
    }
}

function checkEmail(){
    var email = $("#email").val();
    if(email == "" || email == null){
        $("#emailDiv2").css("display","none");
        $("#emailDiv1").css("display","block");
        return false;
    }else{
        var pattern = /^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,10}[.](com|cn|net)$/;
        if (!pattern.test(email)) {
            $("#emailDiv1").css("display","none");
            $("#emailDiv2").css("display","block");
            return false;
        }else{
            $("#emailDiv1").css("display","none");
            $("#emailDiv2").css("display","none");
        }
    }
}
function userchange(){
    $("#cellPhonediv").show();
    $("#cellPhonespandiv").hide();
    $("#emaildiv").show();
    $("#emailspandiv").hide();
}

function userreset(){
   /* $("#userName").val("");
    $("#cardNo").val("");*/
    $("#tel").val("");
    $("#email").val("");
   /* $("#userNameDiv").css("display","none");
    $("#cardNoDiv1").css("display","none");
    $("#cardNoDiv2").css("display","none");
    $("#cardNoDiv3").css("display","none");*/
    $("#cellPhoneDiv1").css("display","none");
    $("#cellPhoneDiv2").css("display","none");
    $("#emailDiv1").css("display","none");
    $("#emailDiv2").css("display","none");
}


/* 对密码验证*/
function pwdsubmit() {
    var mark = 0;
    /* var username = $("#pwdloginName").val();*/
    var oldPwd = $("#oldPwd").val();
    /* if(oldPwd == "" || oldPwd == null){
     $("#oldPwdDiv2").css("display","none");
     $("#oldPwdDiv1").css("display","block");
     mark++;
     }else{
     $.ajax({
     type:"post",
     url:"http://10.1.17.28:8090/safecity/personInformation",
     data:{
     action:3,
     username:'dsa0001425',
     password:oldPwd
     },
     dataType:"json",
     success:function(data){
     alert(data.password)
     if(data.password == "ok"){
     $("#oldPwdDiv1").css("display","none");
     $("#oldPwdDiv2").css("display","none");
     }else{
     $("#oldPwdDiv1").css("display","none");
     $("#oldPwdDiv2").css("display","block");
     return false;
     }
     }
     });
     }*/
    var password = $("#password").val();
    if(password == "" || password == null){
        $("#passwordDiv2").css("display","none");
        $("#passwordDiv1").css("display","block");
        mark++;
    }else{
        if(oldPwd != password){
            $("#passwordDiv1").css("display","none");
            $("#passwordDiv2").css("display","none");
        }else{
            $("#passwordDiv1").css("display","none");
            $("#passwordDiv2").css("display","block");
            mark++;
        }
    }
    var pwd = $("#pwd").val();
    if(pwd == "" || pwd == null){
        $("#pwdDiv2").css("display","none");
        $("#pwdDiv1").css("display","block");
        mark++;
    }else{
        if(password == pwd){
            $("#pwdDiv1").css("display","none");
            $("#pwdDiv2").css("display","none");
        }else{
            $("#pwdDiv1").css("display","none");
            $("#pwdDiv2").css("display","block");
            mark++;
        }
    }
    if(mark > 0){
        return false;
    }else{
        alert("change")
        $.ajax({
            type:"post",
            url:"http://10.1.17.28:8090/safecity/personInformation",
            data: {
                username:'dsa0001425',
                password:password,
                action:4
            },
            dataType:"json",
            success:function(data){
                /*  if(data.flag == "1"){
                 alert("修改用户密码成功,请重新登录！");
                 }else{
                 alert("修改用户密码失败！");
                 }*/
            }
        });
    }
}

/*密码页面*/
function checkOldPwd(){
    /*var username = $("#username").val();
    alert(username)*/
    var oldPwd = $("#oldPwd").val();
    if(oldPwd == "" || oldPwd == null){
        $("#oldPwdDiv2").css("display","none");
        $("#oldPwdDiv1").css("display","block");
        return false;
    }else{
       /* alert("password access")
        alert(oldPwd)*/
        $.ajax({
            type:"post",
            url:"http://10.1.17.28:8090/safecity/personInformation",
            data:{
                action:3,
                username:'dsa0001425',
                password:oldPwd
            },
            dataType:"json",
            success:function(data){
                alert(data.password)
                if(data.password == "ok"){
                    $("#oldPwdDiv1").css("display","none");
                    $("#oldPwdDiv2").css("display","none");
                }else{
                    $("#oldPwdDiv1").css("display","none");
                    $("#oldPwdDiv2").css("display","block");
                    return false;
                }
            }
        });

    }
}

function checknewPassword(){
    var oldPwd = $("#oldPwd").val();
    var password = $("#password").val();
    if(password == "" || password == null){
        $("#passwordDiv2").css("display","none");
        $("#passwordDiv1").css("display","block");
        return false;
    }else{
        if(oldPwd != password){
            $("#passwordDiv1").css("display","none");
            $("#passwordDiv2").css("display","none");
        }else{
            $("#passwordDiv1").css("display","none");
            $("#passwordDiv2").css("display","block");
            return false;
        }
    }
}

function checkconfimPwd(){
    var password = $("#password").val();
    var pwd = $("#pwd").val();
    if(pwd == "" || pwd == null){
        $("#pwdDiv2").css("display","none");
        $("#pwdDiv1").css("display","block");
        return false;
    }else{
        if(password == pwd){
            $("#pwdDiv1").css("display","none");
            $("#pwdDiv2").css("display","none");
        }else{
            $("#pwdDiv1").css("display","none");
            $("#pwdDiv2").css("display","block");
            return false;
        }
    }
}

function pwdreset(){
    $("#oldPwd").val("");
    $("#password").val("");
    $("#pwd").val("");
    $("#oldPwdDiv1").css("display","none");
    $("#oldPwdDiv2").css("display","none");
    $("#passwordDiv1").css("display","none");
    $("#passwordDiv2").css("display","none");
    $("#pwdDiv1").css("display","none");
    $("#pwdDiv2").css("display","none");
}
/*//重设大小
function processResize(){
    //获得父页面iframe的宽度高度
    var width=window.parent.document.getElementById("mian_content").clientWidth;
    var height=window.parent.document.getElementById("mian_content").clientHeight;
    document.getElementById("UserEditDiv").style.width = width -18+ "px";
    document.getElementById("UserEditDiv").style.height = height -18+ "px";
    document.getElementById("contentDiv").style.height = height -18-82+ "px";
}
//改变窗口大小时调用方法;
window.onresize =processResize;*/
