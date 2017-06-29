/**
 * Created by greta on 2017/6/19.
 */
<!--全选或全不选-->
$(function () {
//            全选
    $("#all").click(function () {
        if(this.checked){
            $("input:checkbox").prop("checked", true);
        }else{
            $("input:checkbox").prop("checked", false);
        }
    })
});

<!--modal-->
<!--一开始模态框隐藏-->
{ $("#people-info").modal({show:false});
{ $("#change-info").modal({show:false});

    $(function () { $('#people-info').modal({
        keyboard: true
    })})

    $(function () { $('#change-info').modal({
        keyboard: true
    })})}}