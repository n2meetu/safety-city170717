/**
 * Created by greta on 2017/6/12.
 */
$(".menu_body").hide();
$(function () {
    $("#menu-list p.menu_head").click(function () {
        $(this).addClass("current").next("div.menu_body").slideToggle(300).
        siblings("div.menu_body").slideUp();//隐藏
        $(this).next(".menu_body").addClass("current_body");
        $(this).siblings().removeClass("current");
    });
});