/**
 * Created by lpf on 2017/6/10.
 */
var action1=0;
var action2=0;
$().ready(function() {
    //添加身份证验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) {
        return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
    }, "请正确输入您的身份证号码");
    //添加电话号码验证
    jQuery.validator.addMethod("isPhone", function(value,element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        var tel = /^\d{3,4}-?\d{7,9}$/;
        return this.optional(element) || (tel.test(value) || mobile.test(value));
    }, "请正确填写您的联系电话");

    // 在键盘按下并释放及提交后验证提交表单
    $("#signupForm").validate({
        rules: {
            Username: {
                required: true,
                minlength: 2
            },
            Name: "required",

            ID:{
                required:true,
                isIdCardNo:true
            },
            Tel:{
                required:true,
                isPhone:true
            },

            PassWord: {
                required: true,
                minlength: 5
            },
            ConfirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#PassWord"
            },
            Email: {
                required: true,
                email: true
            },
        },
        messages: {
            Username: "请输入您的名字",
            Name: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成"
            },
            ID:{
                required:"请输入身份证号",
                isIdCardNo:"请输入正确的身份证号"
            },
            Tel:{
                required: "请输入您的联系电话",
                isPhone: "请输入有效的联系电话"
            },
            PassWord: {
                required: "请输入密码",
                minlength: "密码长度不小于5个字母"
            },
            ConfirmPassword: {
                required: "请输入密码",
                minlength: "密码长度不小于5个字母",
                equalTo: "两次密码输入不一致"
            },
            Email: "请输入一个正确的邮箱",
        },

    });
});
function checkusername() {
    //后台验证提交
    var username = $("#Username").val();
    var action=1;
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/register",
        data: {
            username:username,
            action:action
        },
        dataType:"json",
        success:function(state){
            if((state.account_check=="OK")&&(state.account_check!=" ")){
                action1=1;
            }else if(state.account_check=="NO"){
                $("#Username").attr("value"," ");
                $("#Username").attr("placeholder" ,"用户名已被注册，请输入用户名！");
            }
        }
    });
}
function checkID() {
    var id_card=$("#ID").val();
   /* var name=$("#Name").val();*/
    var action=2;
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/register",
        data: {
            id_card:id_card,
           /* name:name,*/
            action:action
        },
        dataType:"json",
        success:function(state){
            if(state.ID_check=="OK"){
               action2=1;
            }else if(state.ID_check=="NO"){
               alert("该身份证用户，已经注册过了，不能重复注册！");
        }
        }
    });
}

function regformsub() {
    var username=$("#Username").val();
    var name = $("#Name").val();
    var id_card=$("#ID").val();
    var password=$("#PassWord").val();
    var email=$("#Email").val();
    var tel=$("#Tel").val();
    var action=3;
    alert(action2)
    alert(action1)
    if(action1==1&&action2==1)
    {
        alert("申请注册")
        $.ajax({
            type: "post",
            url: "http://10.1.17.28:8090/safecity/register",
            data: {
                username: username,
                name: name,
                id_card: id_card,
                password: password,
                email: email,
                tel: tel,
                action: action
            },
            dataType: "json",
            success: function (state) {
                if (state.result == "success") {
                    alert("成员注册已提交，请联系管理员审核通过！");
                } else if (state.result == "LackInformation") {
                    alert("请完善你的信息！");
                }
            }

    });
}
}
