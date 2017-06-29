
//节点坐标数组
var point=new Array();
//节点编号
var point_id=1;
//marker数组
var mark_ary=new Array();
//地图生成
var base=new Array();
//数据传输
var coordinate=new  Array();

function creatmap() {

    map=new BMap.Map("container",{minZoom:1,maxZoom:18});
    var  point=new BMap.Point(120.349795,30.3190200);

    map.centerAndZoom(point,16);
    map.enableScrollWheelZoom(true);//滚轮 调整大小
    map.addControl(new BMap.ScaleControl()); //增加比例尺控件
    map.addControl(new BMap.NavigationControl());  //增加尺寸缩放控件
    map.addContextMenu(addmenu());
}
//菜单生成
function addmenu(){

    var menu=new BMap.ContextMenu();
    var txtMenuItem=Getaddmenu();
    for(var i=0; i < txtMenuItem.length; i++){
        menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100000));
    }
    return menu ;
}
//标记点mark 生成
function MarkPoint(obj) {


    var mark = new BMap.Marker(new BMap.Point(obj.lng,obj.lat));

    //地图显示
    map.addOverlay(mark);            //增加点map.addOverlay(marker);
    //跳动的动画

    //添加菜单
    var mark_menu=add_mark_menu();

    mark.addContextMenu(mark_menu);
    return mark;
}
//右键菜单项生成
function Getaddmenu() {

    var Menu = [
        {
            text: "节点设置",
            callback: function (p) {
                var obj = new Object();
                obj.id = point_id;
                obj.lng = p.lng;
                obj.lat = p.lat;
                var m = MarkPoint(obj);

                point.push(obj);
                mark_ary.push(m);
                tr_add(obj,point.id);
                point_id++;
                counter();
            }

        }
    ];
     return Menu;
}
//右键菜单添加
function mark_menu() {
    var Menu=[
        {
            text: "取消节点 ",
            callback: function (e,ee,mark) {

                for(var i = 0 ; i < mark_ary.length ; i++) {
                    //如果坐标相同
                    if (mark_ary[i].point.lat==mark.point.lat&&mark_ary[i].point.lng==mark.point.lng) {


                        for(var a=0;a<point.length;a++)
                        {
                            if (mark_ary[i].point.lat==point[a].lat&&mark_ary[i].point.lng==point[a].lng) {
                                tr_remove(a+1);
                            }
                        }
                        mark_ary.splice(i,1);
                        break;
                    }
                    //移除标记点

                }
                map.removeOverlay(mark);
            }
        }
    ];
    return Menu;

}
//标记点菜单生成
function add_mark_menu(){

    var menu=new BMap.ContextMenu();
    var MenuItem=mark_menu();
    for(var i=0; i < MenuItem.length; i++){
        menu.addItem(new BMap.MenuItem(MenuItem[i].text,MenuItem[i].callback,100000));
    }
    return menu ;
}

//清空mark数组
function remove_array_mark(mark_ary) {
    mark_ary.splice(0,mark_ary.length);
}
//清空数组
function remove_array_point(point) {
    point.splice(0,point.length);
    point_id=1;
}
//删除mark
function remove_mark(point_id) {
    var  i=0;
    for(i in point)
    {
        if(value.id == id){
            point.splice(n,1);
        }
    }
}
//多边形生成
function set_polygon() {


    for(i=0;i<mark_ary.length;i++)
    {
        base.push(new BMap.Point(mark_ary[i].point.lng,mark_ary[i].point.lat));
    }

    var  polygon=new BMap.Polygon(base);
    polygon.setStrokeColor("blue");
    polygon.setStrokeOpacity(0.5);
    polygon.setStrokeWeight(3);
    polygon.setFillColor("red");
    map.addOverlay(polygon);
    //获取多边形中心点
    //  q=polygon.getBounds();
    // alert(polygon.getBounds());
}
//多边形移除
function remove_polygon() {

    base.length=0;
    mark_ary.length=0;
    point.length=0;
    point_id=1;

    var l=$("#table_point tr").length;
    for(c=1;c<=l;c++)
    {
        tr_remove(c);
    }
    //map.removeOverlay();//或者map.clearOverlays

    map.clearOverlays();
}
//增加一行
function tr_add(obj,a) {

    var tbody=document.getElementById("table_point").getElementsByTagName("TBODY")[0];
    var row=document.createElement("TR");
    //设置行号id
    row.id=obj.id;
    var td1=document.createElement("TD");
    td1.appendChild(document.createTextNode(obj.id));
    var td2=document.createElement("TD");
    td2.appendChild(document.createTextNode(obj.lat));
    var td3=document.createElement("TD");
    td3.appendChild(document.createTextNode(obj.lng));
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);

}
//删除一行
function tr_remove(id) {
    $("#"+id).remove();
}
function counter() {
    number=$("#table_point tr").length;
    if(number>=4) {

        $("#polygon_remove").css('display','inline');
        $("#polygon_set").css('display','inline');
        $("#polygon_submit").css('display','inline');
        $("#polygon_name").css('display','inline');
        $("#polygon_name_txt").css('display','inline');
        $("#polygon_name").val(null);
        // alert(number-1);
    }
}
function upload() {

    for(var i=0;i<base.length;i++)
    {
        var obj=new Object();
        obj.lng=base[i].lng;
        obj.lat=base[i].lat;
        coordinate.push(obj);
    }
    var polygon_json = JSON.stringify(coordinate);
    var t=document.getElementById("polygon_name").value;
    alert(t);
    $.ajax({
        type:"Post",
        url:"http://localhost:8088/tao/polygon",
        dateType:"json",
        data:{
            username:t,
            coordinate:polygon_json
        },
        success:function(data) {
        }
    });
    coordinate.length=0;

}