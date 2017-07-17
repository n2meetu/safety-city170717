/**
 * Created by lpf on 2017/7/15.
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
    //获取点击+处的class，现在只对第这样做的，上两级重构
    drawMangnger();   //触发地图绘制工具
    if(a=="addpol"||a=="gongshuquaddpol"||a=="xihuquaddpol"||a=="shangchengquaddpol"||a=="xiachengquaddpol"
        ||a=="xiaoshanquaddpol"||a=="binjiangquaddpol"||a=="yuhangquaddpol")
    {
        $("#selectModel").attr("data-target","#pol_Modal");
        $("#selectModeldiv").attr("onclick","closepolBox()")
        $("#pol_lev").attr("value","2");

        if(a=="addpol"){
            var pol_pol=$("#jiangganqu").html();
            $("#pol_police").attr("value",pol_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="gongshuquaddpol"){
            var gs_pol=$("#gongshuqu").html();
            $("#pol_police").attr("value",gs_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="xihuquaddpol"){
            var xh_pol=$("#xihuqu").html();
            $("#pol_police").attr("value",xh_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="yuhangquaddpol"){
            var yh_pol=$("#yuhangqu").html();
            $("#pol_police").attr("value",yh_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="shangchengquaddpol"){
            var sc_pol=$("#shangchengqu").html();
            $("#pol_police").attr("value",sc_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="xiachengquaddpol"){
            var xc_pol=$("#xiachengqu").html();
            $("#pol_police").attr("value",xc_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="binjiangquaddpol"){
            var bj_pol=$("#binjiangqu").html();
            $("#pol_police").attr("value",bj_pol);   /* 提交的框内大区区域名称*/
        }else if(a=="xiaoshanquaddpol"){
            var xs_pol=$("#xiaoshanqu").html();
            $("#pol_police").attr("value",xs_pol);   /* 提交的框内大区区域名称*/
        }
        add_polygon();
    }else if(a=="addcom"||a=="gongshuquaddcom"||a=="xihuquaddcom"||a=="shangchengquaddcom"||a=="xiachengquaddcom"
    ||a=="xiaoshanquaddcom"||a=="binjiangquaddcom"||a=="yuhangquaddcom"){
        $("#selectModel").attr("data-target","#com_Modal");
        $("#com_lev").attr("value","3");
        add_polygon();
    }else if(a=="addlou"){
        $("#selectModel").attr("data-target","#sta_Modal");
        $("#selectModeldiv").attr("onclick","closestaBox()")
        $("#sta_lev").attr("value","4");
       /* 第四级其他操作*/
       add_polygon();
    }
}

/*江干区菜单列表*/
function get_Polgon(a){
    map.clearOverlays();    //a为当前点击的<a>
    var poly=a;
    var name=$("#"+poly).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
                success:function(state){
            //防止派出所在添加时重复出现
            $("#polaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){

                var html=

                    '<div class="panel panel-default">'
                    +'<div class="panel-heading">'   //派出所级别的标题名称
                    +'<h4 class="panel-title">'
                    +'<a data-toggle="collapse" data-parent="#polaccordion" href="#collapsejgpol'+i+'" class="polname" onclick="get_com(this.id ,'+i+')">'
                    +'</a>'
                    +'</h4>'
                    +'</div>'

                    +'<div class="panel-collapse collapse" id="collapsejgpol'+i+'">'
                    +'<div class="panel-body">'
                    +'<div class="panel-group"  id="jgcom'+i+'" > '

                    //将社区级别循环展现在该处

                    +'</div>'
                    +'</div>'
                    +'</div>'

                +'</div>';
                $("#polaccordion").append(html);
                /* 根据固定class 动态产生一个class,根据动态的class来产生不同的id,来赋值派出所名称*/
                $(".polname").attr("class","polname"+i);
                $("."+"polname"+i).attr("id","polname"+i);
                $("#"+"polname"+i).html(state.menu[i]);   //循环添加派出所级别的名称

                /* 查看派出所详情处的class和id*/
                $(".viewpol").attr("class","viewpol"+i);
                $("."+"viewpol"+i).attr("id","viewpol"+i);  //

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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            $("#gongshuqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){

                var html=
                    '<div class="panel panel-default">'
                    +'<div class="panel-heading">'   //派出所级别的标题名称
                    +'<h4 class="panel-title">'
                    +'<a data-toggle="collapse" data-parent="#gongshuqupolaccordion" href="#collapsegspol'+i+'" class="polname" onclick="send_gscom(this.id ,'+i+')">'
                    +'</a>'
                    +'</h4>'
                    +'</div>'

                    +'<div class="panel-collapse collapse" id="collapsegspol'+i+'">'
                    +'<div class="panel-body" id="gscom'+i+'">'
                    +'<div class="panel-group"> '
                    //将社区级别循环展现在该处
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</div>';

                /*  此处还应修改id和class*/
                $("#gongshuqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id绑定显示处*/
                $(".polname").attr("class","gongshuqupolname"+i);
                $("."+"gongshuqupolname"+i).attr("id","gongshuqupolname"+i);
                $("#"+"gongshuqupolname"+i).html(state.menu[i]);
                //信息查看动态添加class和id

                $(".gsviewpol").attr("class","gsviewpol"+i);
                $("."+"gsviewpol"+i).attr("id","gsviewpol"+i);
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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            $("#xihuqupolaccordion").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){

                var html=
                    '<div class="panel panel-default">'
                    +'<div class="panel-heading">'   //派出所级别的标题名称
                    +'<h4 class="panel-title">'

                    +'<a data-toggle="collapse" data-parent="#xihuqupolaccordion" href="#collapsexhpol'+i+'" class="polname" onclick="send_xhcom(this.id ,'+i+')">'
                    +'</a>'

                    +'</h4>'
                    +'</div>'

                    +'<div class="panel-collapse collapse" id="collapsexhpol'+i+'">'
                    +'<div class="panel-body" id="xhcom'+i+'">'
                    +'<div class="panel-group"> '

                    //将社区级别循环展现在该处
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</div>';

                /*  此处还应修改id和class*/
                $("#xihuqupolaccordion").append(html);
                /* 动态产生一个class,根据动态的class来产生不同的id绑定显示处*/
                $(".polname").attr("class","xihuqupolname"+i);
                $("."+"xihuqupolname"+i).attr("id","xihuqupolname"+i);
                $("#"+"xihuqupolname"+i).html(state.menu[i]);
                //信息查看动态添加class和id

                $(".xhviewpol").attr("class","xhviewpol"+i);
                $("."+"xhviewpol"+i).attr("id","xhviewpol"+i);
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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading" id="scheading">'
                +'<h4 class="panel-title">'
                +'<a data-toggle="collapse" data-parent="#shangchengqupolaccordion" href="#shangchengqucollapsepol" class="polname" onclick="send_sccom(this.id)">'
                +'</a>'
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

                $(".scviewpol").attr("class","scviewpol"+i);
                $("."+"scviewpol"+i).attr("id","scviewpol"+i);


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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading" id="xcheading">'
                +'<h4 class="panel-title">'
                +'<a data-toggle="collapse" data-parent="#xiachengqupolaccordion" href="#xiachengqucollapsepol" class="polname" onclick="send_xccom(this.id)">'
                +'</a>'
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

                $(".xcviewpol").attr("class","xcviewpol"+i);
                $("."+"xcviewpol"+i).attr("id","xcviewpol"+i);
                // $(".pol_place_info").html(state.menu[i]);
               /* $(".pol_police_info").html()*/

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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading" id="bjheading">'
                +'<h4 class="panel-title">'
                +'<a data-toggle="collapse" data-parent="#binjiangqupolaccordion" href="#binjiangqucollapsepol" class="polname" onclick="send_bjcom(this.id)">'
                +'</a>'
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

                $(".bjviewpol").attr("class","bjviewpol"+i);
                $("."+"bjviewpol"+i).attr("id","bjviewpol"+i);
               /* $(".pol_place_info").html(state.menu[i]);*/
               /* $(".pol_police_info").html()*/

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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading" id="yhheading">'
                +'<h4 class="panel-title">'
                +'<table style="width:100%;text-align:center">'
                +'<tr>'
                +'<th>'
                +'<a data-toggle="collapse" data-parent="#yuhangqupolaccordion" href="#yuhangqucollapsepol" class="polname" onclick="send_yhcom(this.id)">'
                +'</a>'
                +'</th>'

                +'<td>'
                +'<a class="yhviewpol" onclick="view_pol_info(this.id)"><i class="fa fa-lg fa-check-square-o"></i></a>'
                +'</td>'

                +'<td>'
                +'<a href="#">'
                +'<i class="fa fa-lg fa-pencil-square-o" class="mypol" onclick="change_pol_info()">'
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

                $(".yhviewpol").attr("class","yhviewpol"+i);
                $("."+"yhviewpol"+i).attr("id","yhviewpol"+i);
               /* $(".pol_place_info").html(state.menu[i]);*/
               /* $(".pol_police_info").html()*/

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
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            var html='<div class="panel panel-default"  style="width:100%;text-align:center">'
                +'<div class="panel-heading" id="xsheading">'
                +'<h4 class="panel-title">'
                +'<a data-toggle="collapse" data-parent="#xiaoshanqupolaccordion" href="#xiaoshanqucollapsepol" class="polname" onclick="send_xscom(this.id)">'
                +'</a>'
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

                $(".xsviewpol").attr("class","xsviewpol"+i);
                $("."+"xsviewpol"+i).attr("id","xsviewpol"+i);
              /*  $(".pol_place_info").html(state.menu[i]);*/
              /*  $(".pol_police_info").html()*/

            }
        }}
    );
}


/*增加社区级别*/
/*点击派出所级别进行添加下级菜单*/
/*idNum相当于上一级的i*/
function get_com(a,didNum){
    map.clearOverlays();
    var comy=a;
    var name=$("#"+comy).html();   //获取派出所名称
    var b='menu'
   //实现点某个派出所时，展示社区
  //  $("#"+a).parent().parent().parent().parent().parent().parent().next().attr("class","panel-collapse collapse in");
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,   //所属派出所
                action:b
            },
        dataType:"json",
        success:function(state){
            for(i=0;i<state.points.length;i++) {
                var point = new Object();
                point.lat = state.points[i].lat;
                point.lng = state.points[i].lng;
                points.push(point);
            }

            $("#"+"jgcom"+didNum).get(0).innerHTML = "";

            //产生派出所下的社区列表
            for(var i=0;i<state.menu.length;i++){
                /*(function(i){*/
                    var html=
                        '<div class="panel panel-default">'
                        +'<div class="panel-heading">'   //社区级别的标题名称
                        +'<h4 class="panel-title">'

                        +'<table style="width:100%">'
                        +'<tr>'
                        +'<td>'
                        +'<a  data-toggle="collapse" data-parent="#jgcom'+didNum+'"  href="#collapsejgcom'+didNum+i+'" onclick="getmap(this.id,'+i+','+didNum+')">'
                        +'</a>'

                        +'<i type="button" class="fa fa-1x fa-plus-square-o" class="loubtn" id="addlou" onclick="addtip(this.id)">'
                        +'</i>'

                        +'</td>'
                       
                        +'</tr>'

                        +'</table>'

                        +'</h4>'
                        +'</div>'

                        +'<div class="panel-collapse collapse" id="collapsejgcom'+didNum+i+'">'
                        +'<div class="panel-body" >'
                        +'<div class="panel-group" id="jgsta'+didNum+i+'" class="xyz"> '

                        //将社区级别循环展现在该处

                        +'</div>'
                        +'</div>'
                        +'</div>'

                        +'</div>';

                    /*新加上的为每个社区上的div产生一个id，然后根据id来添加html*/
                    $("#"+"jgcom"+didNum).append(html);
                   /* $("#"+"collapsejgcom"+idNum+i).children().children().attr("id","jgsta"+i);*/

                    $("#"+"jgcom"+didNum).children().eq(i).children().children().children().children().children().children().children(":first").attr("id","jgcom"+didNum+i);
                    $("#"+"jgcom"+didNum+i).html(state.menu[i]);
               /* })(i);*/
            }
            //获取派出所级别的中心点并绘制派出所的图形
            var str = state.centerPoint;
            var strs=[]
            strs=str.split(",")
            var a = strs[0];
            var b = strs[1];
            var center = new BMap.Point(a,b);
            map.centerAndZoom(center,15);
            map.enableScrollWheelZoom();
            add_polygon();
        }}
    );
}
function send_gscom(a,idNum){
    map.clearOverlays();
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }

            $("#"+"gscom"+idNum).get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                 var html=
                     '<table style="width:100%">'
                     +'<tr>'
                     +'<td>'
                     +'<a href="#" onclick="getmap(this.id,i)">'
                     +'</a>'
                     +'<i type="button" class="fa fa-1x fa-plus-square-o" class="loubtn" id="addlou" onclick="addtip(this.id)">'
                     +'</i>'
                     +'</td>'
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
                     +'</table>';
                 /*新加上的为每个社区上的div产生一个id，然后根据id来添加html*/
                 $("#"+"gscom"+idNum).append(html);
                 $("#"+"gscom"+idNum).children().eq(i).children().children().children().children(":first").attr("id","gscom"+idNum+i);
                 $("#"+"gscom"+idNum+i).html(state.menu[i]);
                 console.log(state.menu[i]);
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
function send_xhcom(a,idNum){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){
            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }

            $("#"+"xhcom"+idNum).get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                var html=
                    '<table style="width:100%">'
                    +'<tr>'
                    +'<td>'
                    +'<a href="#" onclick="getmap(this.id,i)">'
                    +'</a>'
                    +'<i type="button" class="fa fa-1x fa-plus-square-o" class="loubtn" id="addlou" onclick="addtip(this.id)">'
                    +'</i>'
                    +'</td>'
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
                    +'</table>';
                /*新加上的为每个社区上的div产生一个id，然后根据id来添加html*/
                $("#"+"xhcom"+idNum).append(html);
                $("#"+"xhcom"+idNum).children().eq(i).children().children().children().children(":first").attr("id","xhcom"+idNum+i);
                $("#"+"xhcom"+idNum+i).html(state.menu[i]);
                console.log(state.menu[i]);
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
function send_sccom(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }
            console.log(points)
            var html= '<div id="shangchengqucollapsepol" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" class="comname" onclick="getmap()"></a></td>'
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
            $("#scheading").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){

                $("#scheading").append(html);
                $(".comname").attr("class","shangchengqucomname"+i);
                $("."+"shangchengqucomname"+i).attr("id","shangchengqucomname"+i);
                $("#"+"shangchengqucomname"+i).html(state.menu[i]);
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
function send_xccom(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }
            var html= '<div id="xiachengqucollapsepol" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" class="comname" onclick="getmap()"></a></td>'
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
            $("#xcheading").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                $("#xcheading").append(html);

                $(".comname").attr("class","xiachengqucomname"+i);
                $("."+"xiachengqucomname"+i).attr("id","xiachengqucomname"+i);
                $("#"+"xiachengqucomname"+i).html(state.menu[i]);

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
function send_bjcom(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }
            console.log(points)
            var html= '<div id="binjiangqucollapsepol" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" class="comname" onclick="getmap()"></a></td>'
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

            $("#bjheading").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                $("#bjheading").append(html);

                $(".comname").attr("class","binjiangqucomname"+i);
                $("."+"binjiangqucomname"+i).attr("id","binjiangqucomname"+i);
                $("#"+"binjiangqucomname"+i).html(state.menu[i]);

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
function send_yhcom(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }

            var html= '<div id="yuhangqucollapsepol" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" class="comname" onclick="getmap()"></a></td>'
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
            $("#yhheading").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                $("#yhheading").append(html);
                $(".comname").attr("class","yuhangqucomname"+i);
                $("."+"yuhangqucomname"+i).attr("id","yuhangqucomname"+i);
                $("#"+"yuhangqucomname"+i).html(state.menu[i]);
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
function send_xscom(a){
    map.clearOverlays();
    var newpoints=[];
    var comy=a;
    var name=$("#"+comy).html();
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,
                action:b
            },
        dataType:"json",
        success:function(state){

            for(i=0;i<state.points.length;i++) {
                var a = new Object();
                a.lat = state.points[i].lat;
                a.lng = state.points[i].lng;
                points.push(a);
            }
            console.log(points)
            var html= '<div id="xiaoshanqucollapsepol" class="panel-collapse collapse" style="width:100%">'
                +'<div class="panel-body">'
                +'<table style="width:100%">'
                +'<tr>'
                +'<td><a href="#" class="comname" onclick="getmap()"></a></td>'
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
            $("#xsheading").get(0).innerHTML = "";
            for(var i=0;i<state.menu.length;i++){
                $("#xsheading").append(html);
                $(".comname").attr("class","xiaoshanqucomname"+i);
                $("."+"xiaoshanqucomname"+i).attr("id","xiaoshanqucomname"+i);
                $("#"+"xiaoshanqucomname"+i).html(state.menu[i]);
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



//点击社区级别得到社区级别的图形信息及包含的楼宇信息
/*idNum是上一个的i*/
function getmap(a,idNum,didNum) {
    //a为当前点击的id
    map.clearOverlays();
    var sation=a;
    var name=$("#"+sation).html();   //获取楼宇名称
    var b='menu'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,   //当前社区的名称
                action:b
            },
        dataType:"json",

        success:function(state){
            for(i=0;i<state.points.length;i++) {
                var point = new Object();
                point.lat = state.points[i].lat;
                point.lng = state.points[i].lng;
                points.push(point);
            }
            console.log(points);

            $("#"+"jgsta"+didNum+idNum).get(0).innerHTML = "";
            //产生派出所下的社区列表
            for(var i=0;i<state.menu.length;i++){

                var html=
                    //楼宇显示
                    '<table style="width:100%">'
                    +'<tr>'
                    +'<td>'
                    +'<a  data-toggle="collapse" data-parent="#jgsta'+didNum+idNum+'"  href="#collapsejgsta'+didNum+idNum+i+'"  onclick="lou_map(this.id)">'
                    +'</a>'
                    +'</td>'
                    +'<td>'
                    +'<a href="#"><i class="fa fa-lg fa-check-square-o" class="mysta" onclick="checkEquipment()">'
                    +'</i>'
                    +'</a>'
                    +'</td>'
                    +'<td>'
                    +'<a href="#"><i class="fa fa-lg fa-pencil-square-o" class="mysta" onclick="change_pol_info()">'
                    +'</i>'+'</a>'
                    +'</td>'
                    +'<td>'
                    +'<a href="#"><i class="fa fa-lg fa-times-rectangle-o" onclick="deleteEquipment()">'
                    +'</i>'
                    +'</a>'
                    +'</a>'
                    +'</td>'
                    +'</tr>'
                    +'</table>'

                /*新加上的为每个社区上的div产生一个id，然后根据id来添加html*/
                $("#"+"jgsta"+didNum+idNum).append(html);
                $("#"+"jgsta"+didNum+idNum).children().eq(i).children().children().children().children(":first").attr("id","jgsta"+didNum+idNum+i);
                $("#"+"jgsta"+didNum+idNum+i).html(state.menu[i]);
            }
            //获取派出所级别的中心点并绘制派出所的图形
            var str = state.centerPoint;
            var strs=[]
            strs=str.split(",")
            var a = strs[0];
            var b = strs[1];
            var center = new BMap.Point(a,b);
            map.centerAndZoom(center,16);
            map.enableScrollWheelZoom();
            add_polygon();    //添加社区级别的图形
        }}
    );
}

//我感觉是数据库的问题
function lou_map(a){
    console.log(a);
    map.clearOverlays();
    var sation=a;
    var name=$("#"+sation).html();   //获取楼宇名称
    var b='menu'
    console.log(name);
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/selectPolygon",
        data:
            {
                name:name,   //当前社区的名称
                action:b
            },
        dataType:"json",
        success:function(state){
            for(i=0;i<state.points.length;i++) {
                var point = new Object();
                point.lat = state.points[i].lat;
                point.lng = state.points[i].lng;
                points.push(point);
            }

            var str = state.centerPoint;
            var strs=[]
            strs=str.split(",")
            var a = strs[0];
            var b = strs[1];
            var center = new BMap.Point(a,b);
            map.centerAndZoom(center,18);
            map.enableScrollWheelZoom();
            add_polygon();     //添加社区级别的图形
            console.log("print sucess")
        }}
    );
}



/*派出所区域信息增加提交*/
function polInfomation() {

    var name=$(".pol_place").val();
    var level=$(".pol_leval").val();
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
         url:"http://10.1.17.28:8090/safecity/addPolygon",
         data: {
             name:name,
             level:level,
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
             //成功提交，绘制的图形消失，模态框消失
             $("#pol_Modal").hide();
             overlay.hide();

         }
     });
}
/*新增社区区域信息增加提交*/
function comsubmit() {

    var name=$(".com_place").val();
    var belong=$(".com_police").val();
    var polygon=$(".com_region").val();

    var leval=$(".com_leval").val();
    var gis=$(".com_coord").val();
    var deultp=$(".com_person").val();
    var tel=$(".com_tel").val();
    var email=$(".com_email").val();

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
        url:"http://10.1.17.28:8090/safecity/addPolygon",
        data: {
            name:name,
            street_name:belong,
            region_name:polygon,

            level:leval,
            centerPoint:gis,
            person:deultp,
            tel:tel,
            email:email,

            point:polygon_json
        },
        dataType:"json",
        success:function(state){
          points=[];
        }
    });
}
/*楼宇信息提交按钮*/
function stasubmit(){
    var name=$(".sta_place").val();  //楼宇名称

    var level=$(".sta_leval").val();
    var tel=$(".sta_tel").val();
    var email=$(".sta_email").val();
    var gis=$(".sta_coord").val();
    var deultp=$(".sta_person").val();
    var com=$(".sta_com").val();        //所属小区
    var belong=$(".sta_police").val(); //所属派出所
    var region=$(".sta_region").val(); //所属大区

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
        url:"http://10.1.17.28:8090/safecity/addPolygon",
        data: {
            name:name,
            level:level,
            centerPoint:gis,
            tel:tel,
            email:email,
            person:deultp,
            resident_name:com,   //s所属小区
            street_name:belong,  //所属派出所
            region_name:region, //所属大区
            point:polygon_json
        },
        dataType:"json",
        success:function(state){
            points = [];
            //成功提交，绘制的图形消失，模态框消失
            $("#sta_Modal").hide();
            overlay.hide();
        }
    });
}


/* 新增设备的详细信息*/
function submitEquipment() {

    var name=$(".equip_name").val(); 
    var type=$("#equip_type").val();  
    var person=$("#equip_person").val();  //负责人
    var tel=$("#equip_tel").val();
    var email=$("#equip_email").val();
    var lat=$(".equip_lat").val();
    var lng=$(".equip_lng").val();
    var region=$("#equip_region").val();  //行政区域，如“江干区
    var street=$("#equip_street").val();  //派出所
    var resident=$("#equip_resident").val();  //小区
    var cell=$("#equip_cell").val();     //网格

    $.ajax({
         type:"post",
         url:"http://10.1.17.28:8090/safecity/addEquipment",
         data: {     //提交给服务器
             "name":name,
             "type":type,
             "person":person,
             "tel":tel,
             "email":email,
             "lat":lat,
             "lng":lng,
             "region":region,
             "street":street,
             "resident":resident,
             "cell":cell
         }, 
         dataType:"json",
         success:function(state){
             point = '';
            //  alert("aaaaaaa"); 
             //成功提交，绘制的点消失+模态框消失
             $("#com_Modal").hide();
            //  overlay.hide();
             map.removeOverlay(marker);
         }
    });
}

/*查看*/
/*设备信息查看*/
function checkEquipment(a) {
    $("#checkBtn").css("display","none");   //重置和提交按钮 隐藏
    $("#ell-nocheck-div").css("display","block");  //联系电话（只读）  span形式
    $("#cell-check-div").css("display","none");     //联系电话（可修改）input形式
    $("#equip_person1").css("display","block");  
    $("#equip_person1Modify").css("display","none");
    var poly=a;
    var name=$("#"+poly).parent().prev().children().html();
    
    var action='detail'
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/examineEquipment",
        data: {
            name:name,
            action:action
        },
        dataType:"json",
        success:function(data){
            $("#equip_name1").html(data.name);
            $("#equip_type1").html(data.type);
            $("#equip_person1").html(data.person);
            $("#equip_email1").html(data.email);
            $(".equip_lat1").html(data.lat);
            $(".equip_lng1").html(data.lng);
            $("#equip_tel1").html(data.tel);
            $("#equip_region1").html(data.region);
            $("#equip_street1").html(data.street);
            $("#equip_resident1").html(data.resident);
            $("#equip_cell1").html(data.cell);
        }
    });
    $("#viewpolModal").show().animate({"right":"90","width":"100%"},100);
}

/*修改*/
/*设备信息处理*/
function change_pol_info(a){
    $("#checkBtn").css("display","block");   //重置和提交按钮 隐藏
    $("#cell-nocheck-div").css("display","none");  //联系电话（只读）  span形式
    $("#cell-check-div").css("display","block");     //联系电话（可修改）input形式
    $("#equip_person1").css("display","none");  
    $("#equip_person1Modify").css("display","block");

    // var name=$("#pol_place");
    var person=$("#equip_person1Check").val();
    var tel=$("#equip_tel1Check").val();

    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/attrEquipment",
        data: {
            name:name,
            person:person,
            tel:tel,
        },
        dataType:"json",
        success:function(data){
            $("#equip_name1").html(data.name);
            $("#equip_type1").html(data.type);
            $(".equip_lat1").html(data.lat);
            $(".equip_lng1").html(data.lng);
            $("#equip_person1Check").html(data.person);  //可编辑的、input
            $("#equip_tel1Check").val()=data.tel;//可编辑的、input
            $("#equip_email1").html(data.email);
            $("#equip_region1").html(data.region);
            $("#equip_street1").html(data.street);
            $("#equip_resident1").html(data.resident);
            $("#equip_cell1").html(data.cell);
        }
    });
}

function pol_reset(){
    $("#equip_person1Check").val("");
    $("#equip_tel1Check").val("");
}
function pol_submit() {
    var name=$("#pol_place");
    $.ajax({
        type:"post",
        url:"http://10.1.17.28:8090/safecity/attrEquipment",
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

function deleteEquipment(){
    $(".ibox-header").html("删除")
    $("p#my_check").html("确定删除该设备？删除后不可恢复");
    $(".no-delete").attr("data-target","");
    $(".ibox-header i").attr("class","fa fa-lg fa-question-circle")
    $(".myli1 div").attr("onclick","ibox_hide()");
    $(".ibox").show();
}

