/**
 * Created by lpf on 2017/6/29.
 */
/*多边形生成,并产生中心点坐标*/
function add_polygon() {
    for(i=0;i<points.length;i++)
    {
        base.push(new BMap.Point(points[i].lng,points[i].lat));
    }
    var  polygon=new BMap.Polygon(base);
     polygon.setStrokeColor("blue");
     polygon.setStrokeOpacity(0.5);
     polygon.setStrokeWeight(3);
     polygon.setFillColor("blue")
     map.addOverlay(polygon);
     points=[];
     base=[]
}
function addtip(a) {
    drawMangnger();
    if(a=="addpol"||a=="gongshuquaddpol"||a=="xihuquaddpol"||a=="shangchengquaddpol"||a=="xiachengquaddpol"
        ||a=="xiaoshanquaddpol"||a=="binjiangquaddpol"||a=="yuhangquaddpol")
    {
        $("#selectModel").attr("data-target","#pol_Modal");
        $("#selectModeldiv").attr("onclick","closepolBox()")
        $("#pol_lev").attr("value","2");

        var pol_pol= $("#addpol").prev().html(); /*得到当前大区名称*/
        $("#pol_police").attr("value",pol_pol);   /* 提交的框内大区区域名称*/
        add_polygon();
    }else if(a=="addcom"||a=="gongshuquaddcom"||a=="xihuquaddcom"||a=="shangchengquaddcom"||a=="xiachengquaddcom"
    ||a=="xiaoshanquaddcom"||a=="binjiangquaddcom"||a=="yuhangquaddcom"){
        $("#selectModel").attr("data-target","#com_Modal");
        $("#com_lev").attr("value","3");

        var com_com=$("#addcom").prev().html();      //得到当前派出所名称
        $("#com_police").attr("value",com_com);      //为当前社区添加派出所名称
    }

}

/*江干区菜单列表*/
function get_Polgon(a){
     //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
            name:name,
            action:b
        },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#polaccordion" href="#collapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="addcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#polaccordion").get(0).innerHTML = "";
             for(var i=0;i<state.menu.length;i++){
                 /*  此处还应修改id和class*/
                 $("#polaccordion").append(html);
              /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","polname"+i);
                $("."+"polname"+i).attr("id","polname"+i);
                $("#"+"polname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*拱墅区菜单列表*/
function get_gsPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#gongshuqupolaccordion" href="#gongshuqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="gongshuquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#gongshuqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#gongshuqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","gongshuqupolname"+i);
                $("."+"gongshuqupolname"+i).attr("id","gongshuqupolname"+i);
                $("#"+"gongshuqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*西湖区菜单列表*/
function get_xhPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#xihuqupolaccordion" href="#xihuqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="xihuquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#xihuqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#xihuqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","xihuqupolname"+i);
                $("."+"xihuqupolname"+i).attr("id","xihuqupolname"+i);
                $("#"+"xihuqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*上城区菜单*/
function get_scPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#shangchengqupolaccordion" href="#shangchengqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="shangchengquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#shangchengqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#shangchengqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","shangchengqupolname"+i);
                $("."+"shangchengqupolname"+i).attr("id","shangchengqupolname"+i);
                $("#"+"shangchengqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*下城区菜单*/
function get_xcPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#xiachengqupolaccordion" href="#xiachengqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="xiachengquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#xiachengqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#xiachengqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","xiachengqupolname"+i);
                $("."+"xiachengqupolname"+i).attr("id","xiachengqupolname"+i);
                $("#"+"xiachengqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*滨江区菜单*/
function get_bjPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#binjiangqupolaccordion" href="#binjiangqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="binjiangquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#binjiangqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#binjiangqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","binjiangqupolname"+i);
                $("."+"binjiangqupolname"+i).attr("id","binjiangqupolname"+i);
                $("#"+"binjiangqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*余杭区菜单*/
function get_yhPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#yuhangqupolaccordion" href="#yuhangqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="yuhangquaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#yuhangqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#yuhangqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","yuhangqupolname"+i);
                $("."+"yuhangqupolname"+i).attr("id","yuhangqupolname"+i);
                $("#"+"yuhangqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}
/*萧山区菜单*/
function get_xsPolgon(a){
    //a为当前点击的id
    map.clearOverlays();
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#xiaoshanqupolaccordion" href="#xiaoshanqucollapseplo" class="polname" onclick="send_com(this.id)">'
                +'</a>'
                + '<i type="button" class="fa fa-1x fa-plus-square-o" class="addbtn" id="xiaoshanaddcom" onclick="addtip(this.id)">'
                +'</i>'
                +'</th>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-check-square-o "data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="view_pol_info()">'
                + '</i>'+'</a>'
                +'</td>'+'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewpolModal" class="mypol" onclick="change_pol_info()">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-times-rectangle-o" onclick="delete_pol();">'
                +'</i>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</h4>'
                +'</div>';
            $("#xiaoshanqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                /*  此处还应修改id和class*/
                $("#xiaoshanqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id*/

                $(".polname").attr("class","xiaoshanqupolname"+i);
                $("."+"xiaoshanqupolname"+i).attr("id","xiaoshanqupolname"+i);
                $("#"+"xiaohsanqupolname"+i).html(state.menu[i]);

                $(".pol_place_info").html(state.menu[i]);
                $(".pol_police_info").html()

            }
        }}
    );
}





/*增加社区级别*/
/*点击添加+对区域进行添加*/
function send_com(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            console.log(state.points[0].lat)
            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }
            console.log(points)
            var html= '<div id="collapseplo" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body" id="xiashabody">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" onclick="getmap()"></a></td>'
                +'<td>'
                +'<a href="#"><i class="fa fa-lg fa-check-square-o" data-toggle="modal" data-target="#viewcomModal" class="mycom" onclick="view_com_info()">'
                +'</i>'+'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#"><i class="fa fa-lg fa-pencil-square-o" data-toggle="modal" data-target="#viewcomModal" class="mycom" onclick="change_com_info()">'
                +'</i>'+'</a>'
                +'</td>'
                +'<td>'
                +'<a href="#">'+'<i class="fa fa-lg fa-times-rectangle-o" onclick="deletecom()">'
                + '</i>'
                +'</a>'
                +'</a>'
                +'</td>'
                +'</tr>'
                +'</table>'
                +'</div>'
                +'</div>';

            for(var i=0;i<state.menu.length;i++){
              /*  此处还应修改id和class*/
                $("#polheading").get(0).innerHTML = "";
                $("#polheading").append(html);
            }
            var str = state.centerPoint;
            var strs=[]
            strs=str.split(",")
            var a = strs[0];
            var b = strs[1];
            var center = new BMap.Point(a,b);
            map.centerAndZoom(center,14);
            map.enableScrollWheelZoom();
            add_polygon();
        }}
    );
}

/*派出所区域信息增加提交*/
function polInfomation() {
    var name=$(".pol_place").val();
    var leval=$(".pol_leval").val();
    var tel=$(".pol_tel").val();
    var email=$(".pol_email").val();
    var gis=$(".pol_coord").val();
    var deultp=$(".pol_person").val();
    var belong=$(".pol_police").val();

    for(var i=0;i<points.length;i++)
    {
        var obj=new Object();
        obj.lng=points[i].lng;
        obj.lat=points[i].lat;
        coordinate.push(obj);
    }
    var polygon_json = JSON.stringify(coordinate);
     $.ajax({
         type:"post",
         url:"http://10.66.113.52:8090/safecity/addPolygon",
         data: {
             name:name,
             level:leval,
             centerPoint:gis,
             tel:tel,
             person:deultp,
             region_name:belong,
             email:email,
             point:polygon_json
         },
         dataType:"json",
         success:function(state){
             points = [];
         }
     });
}

/*社区区域信息增加提交*/
function comsubmit() {

    var name=$(".com_place").val();
    var leval=$(".com_leval").val();
    var gis=$(".com_coord").val();
    var deultp=$(".com_person").val();
    var tel=$(".com_tel").val();
    var email=$(".com_email").val();
    var belong=$(".com_police").val();
    var street=$(".com_street").val();
    console.log(leval);
    for(var i=0;i<points.length;i++)
    {
        var obj=new Object();
        obj.lng=points[i].lng;
        obj.lat=points[i].lat;
        coordinate.push(obj);
    }
    console.log(coordinate)
    var polygon_json = JSON.stringify(coordinate);
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/addPolygon",
        data: {
            name:name,
            level:leval,
            centerPoint:gis,
            person:deultp,
            tel:tel,
            email:email,
            region_name:street,
            street_name:belong,
            point:polygon_json
        },
        dataType:"json",
        success:function(state){
          points=[];
        }
    });
}

/*查看*/
/*派出所信息查看*/
function view_pol_info() {
    $("#polchangebtn").css("display","none");
    $("#polcellPhonespandiv").css("display","block");
    $("#polcellPhonediv").css("display","none");
    $("#polspandiv").css("display","block");
    $("#polinputdiv").css("display","none")

    var  name=$(".pol_place_info").html();
    $(".pol_police_info").html($("#addpol").prev().html());


    console.log(name)
    var action='detail'
    $.ajax({
        type:"post",
      /*  url:"http://10.1.17.28:8090/safecity/selectPolygon",*/
        url:"http://10.66.113.52:8090/safecity/selectPolygon",
        data: {
            name:name,
            action:action
        },
        dataType:"json",
        success:function(data){

            $("#pol_level_info").html(data.level);
           $("#pol_coord_info").html(data.centerPoint);
            $("#pol_person_info").html(data.person);
          /*  $("#pol_police_info").html(data.region_name);*/
            $("#pol_cell_info").html(data.tel);

        }
    });
}
/*社区信息查看*/
function view_com_info() {
    $("#changebtn").css("display","none");

    $("#cellPhonespandiv").css("display","block");
    $("#cellPhonediv").css("display","none");

    $("#comspandiv").css("display","block");
    $("#cominputdiv").css("display","none")
    var  name=$("#com_place").val();
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/personInformation",
        data: {
         name:name
        },
        dataType:"json",
        success:function(data){
            $("#com_place_info").html(data.Name);
            $("#com_leval_info").html(data.Leval);

            $("#com_coord_info").html(data.Gis);
            $("#com_person_info").html(data.DeultP);
            $("#com_police_info").html(data.Belong);
        }
    });

}

/*修改*/
/*改变社区级别信息处理*/
function change_com_info(){
    $("#changebtn").css("display","block")
    $("#comspandiv").css("display","none");
    $("#cominputdiv").css("display","block");
    $("#cellPhonespandiv").css("display","none");
    $("#cellPhonediv").css("display","block");

    var name=$("#com_place");
    var person=$("#com_person_input").val();
    var tel=$("#com_cell_input").val();
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/personInformation",
        data: {
            name:name,
            person:person,
            tel:tel,
        },
        dataType:"json",
        success:function(data){
            $("#com_place_info").html(data.Name);
            $("#com_leval_info").html(data.Leval);
            $("#com_cell_input").value(data.cell)
            $("#com_coord_info").html(data.Gis);
            $("#com_person_info").value(data.DeultP);
            $("#com_police_info").html(data.Belong);
        }
    });
}
function com_reset(){
    $("#com_person_input").val("");
    $("#com_cell_input").val("");
}
function com_submit() {
    var name=$("#com_place");
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/personInformation",
        data: {
            name:name,
            action:1
        },
        dataType:"json",
        success:function(data){
           alert("修改成功");
        }
    });
}

/*
派出所级别信息修改处理*/
function change_pol_info(){
    $("#polchangebtn").css("display","block")
    $("#polspandiv").css("display","none");
    $("#polinputdiv").css("display","block");
    $("#polcellPhonespandiv").css("display","none");
    $("#polcellPhonediv").css("display","block");

    var name=$("#pol_place");
    var person=$("#pol_person_input").val();
    var tel=$("#pol_cell_input").val();
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/personInformation",
        data: {
            name:name,
            person:person,
            tel:tel,
        },
        dataType:"json",
        success:function(data){
            $("#pol_place_info").html(data.Name);
            $("#pol_leval_info").html(data.Leval);
            $("#pol_cell_input").value(data.cell)
            $("#pol_coord_info").html(data.Gis);
            $("#pol_person_info").value(data.DeultP);
            $("#pol_police_info").html(data.Belong);
        }
    });
}
function pol_reset(){
    $("#pol_person_input").val("");
    $("#pol_cell_input").val("");
}
function pol_submit() {
    var name=$("#pol_place");
    $.ajax({
        type:"post",
        url:"http://10.66.113.52:8090/safecity/personInformation",
        data: {
            name:name,
            action:1
        },
        dataType:"json",
        success:function(data){
            alert("修改成功");
        }
    });
}
/*
 删除*/
function delete_pol(){
    
}
function deletecom() {

}
function getmap() {
    
}