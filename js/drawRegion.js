/**
 * Created by lpf on 2017/7/9.
 */

/*创建地图*/
function creatmap() {
    var map = new BMap.Map("map");
    var poi = new BMap.Point(120.19, 30.26);
    map.centerAndZoom(poi, 10);
    map.enableScrollWheelZoom();
}
/* 画出行政大区区域*/
function getBoundary(area) {
    var bdary = new BMap.Boundary();
    bdary.get(area, function (rs) { //获取行政区域
        map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
            alert('未能获取当前输入行政区域');
            return;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], { // 创建多边形覆盖物
                strokeWeight: 2, //边线的宽度，以像素为单位。
                strokeColor: "#ff0000" //边线的颜色
            }); //建立多边形覆盖物
            map.addOverlay(ply); //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
        }
        map.setViewport(pointArray); //调整视野
        addlabel();
    });
}

function addlabel() {
    var pointArray = [
        new BMap.Point(121.716076, 23.703799),
        new BMap.Point(112.121885, 14.570616),
        new BMap.Point(123.776573, 25.695422)
    ];
    var optsArray = [{}, {}, {}];
    var labelArray = [];
    var contentArray = [
        "",
        "",
        ""
    ];
    for (var i = 0; i < pointArray.length; i++) {
        optsArray[i].position = pointArray[i];
        labelArray[i] = new BMap.Label(contentArray[i], optsArray[i]);
        labelArray[i].setStyle({
            color: "red",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        map.addOverlay(labelArray[i]);
    }
}
/* 默认显示杭州市江干区*/





