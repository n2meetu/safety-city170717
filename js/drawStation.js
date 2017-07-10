/**
 * Created by lpf on 2017/7/9.
 */
/* 派出所及社区级别多边绘制*/

//绘图的样式
var styleOptions = {
    strokeColor: "red", //边线颜色。
    fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3, //边线的宽度，以像素为单位。
    strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
    fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
}
//绘图完成后调用的回调函数，监听函数
// 鼠标绘制完成回调方法，获取各个点的经纬度
var overlaycomplete = function (e) {
    overlays.push(e.overlay);
    var path = e.overlay.getPath();     //Array<Point> 返回多边型的点数组
    $(".resultShape").html('');
    for(var i=0;i<path.length;i++){
        /* 发送给提交框中的中心点(定位点)*/
        $("#pol_coo").attr("value",path[0].lng+","+path[0].lat);
        $("#com_coo").attr("value",path[0].lng+","+path[0].lat);
        /* 给提交框提交中心点*/
        $(".resultShape").html($(".resultShape").html()+"第"+(i+1)+"个点的经度："+path[i].lng
            +"，纬度"+path[i].lat  //获取各个点的经纬度
            +"</br>");
        points.push(path[i]);
    };
};
function drawMangnger(){
    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        drawingType: BMAP_DRAWING_POLYGON,
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        enableCalculate: false,
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_LEFT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingTypes:[BMAP_DRAWING_POLYGON],
            drawingModes:[BMAP_DRAWING_POLYGON]
        },
        polygonOptions: styleOptions, //多边形的样式
    });
    ///添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    // 区域描绘结束后，弹出modal框
    drawingManager.addEventListener("polygoncomplete", function(e) {
        $(".ibox").fadeIn(800);
    });
}