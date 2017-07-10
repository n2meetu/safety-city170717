/**
 * Created by greta on 2017/6/19.
 * 7月6日修改了模态框传数据的方式 getModalData（）。周五早上修改 success调用
 */
// <!--全选或全不选-->
$(function () {
    // 全选
    $("#all").click(function () {
        if (this.checked) {
            $("input:checkbox").prop("checked", true);
        } else {
            $("input:checkbox").prop("checked", false);
        }
    })
});

// 修改和查看的modal框
    // $("#people-info").modal({
    //     show: false //当初始化时不显示模态框。
    // }); 

    // $("#change-info").modal({
    //     show: false //当初始化时不显示模态框。
    // });

    // $('#people-info').modal({
    //     keyboard: true //当按下 escape 键时关闭模态框
    // })
  
    // $('#change-info').modal({
    //     keyboard: true //当按下 escape 键时关闭“修改”模态框
    // })

    //逐行动态添加人员信息的方法
    function getData(data) {
        var res = data;
        var len = res.length;

        for (var i = 0; i < len; i++) {
            var a = res[i].number; //工号
            var b = res[i].name; //姓名
            var c = res[i].id_card; //身份证
            var d = res[i].phone; //电话
            var e = res[i].email; //邮件
            var f = res[i].user_type; //用户类型
            var g = res[i].area; //负责区域
            $(".people tbody").append(
                '<tr id="tr_' + i + '">' +
                //           第一列：checkbox
                '<td><label class="checkbox"><input type="checkbox"></label></td>' +
                '<td>' + a + '</td>' +
                '<td>' + b + '</td>' +
                '<td>' + c + '</td>' +
                '<td>' + d + '</td>' +
                '<td>' + e + '</td>' +
                '<td>' + f + '</td>' +
                '<td>' + g + '</td>' +
                // 最后一列："查看"、"修改"
                '<td>' +
                '<input type="button" class="scan btn btn-info" data-toggle="modal" data-target="#change-info" value="查看" onclick="check(\'' + res[i].number + '\')">' +
                '<input type="button" class="modify btn btn-success" data-toggle="modal" data-target="#change-info" value="修改" onclick="modify(\'' + res[i].number + '\')">' +
                '</td>' +
                '</tr>');
        }
    }

    //模态框读取人员信息的方法
    function getModalData(data) {
        var index; //获取行号
        $(".scan").click(function () {
            index = $(this).parent().parent().index("tr"); //获取行号
        });

        var resModal = data[index];

        var a = resModal.number; //工号
        var b = resModal.name; //姓名
        var c = resModal.id_card; //身份证
        var d = resModal.phone; //电话
        var e = resModal.email; //邮件
        var f = resModal.user_type; //用户类型
        var g = resModal.area; //负责区域

        $(".mp-modal-form").append(
            //工号
            '<div class="form-group">' +
            'label for="number" class="col-sm-2 control-label">工号</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control item" id="number" value="' + a + '">' +
            '</div>' +
            '</div>' +
            //姓名
            '<div class="form-group">' +
            'label for="name" class="col-sm-2 control-label">姓名</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control item" id="name" value="' + b + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            'label for="id_card" class="col-sm-2 control-label">身份证号</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control item" id="id_card" value="' + c + '">' +
            '</div>' +
            '</div>' +
            // 电话
            '<div class="form-group">' +
            'label for="phone" class="col-sm-2 control-label">电话</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control item" id="phone" value="' + d + '">' +
            '</div>' +
            '</div>' +
            //email
            '<div class="form-group">' +
            'label for="email" class="col-sm-2 control-label">电话</label>' +
            '<div class="col-sm-10">' +
            '<input type="email" class="form-control item" id="email" value="' + e + '">' +
            '</div>' +
            '</div>' +
            //用户类型
            '<div class="form-group">' +
            'label for="user_type" class="col-sm-2 control-label">用户类型</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control item" id="user_type" value="' + f + '">' +
            '</div>' +
            '</div>' +
            //负责区域
            '<div class="form-group">' +
            'label for="area" class="col-sm-2 control-label">负责区域</label>' +
            '<div class="col-sm-10 area-select">' +
            '<input type="text" class="form-control item" id="area" value="' + g + '">' +
            '</div>' +
            '</div>'
        )
    }

    //页面加载时读入数据
    window.onload = function getInfo() {
        var number = "dsa0001425"; //转jsp后修改
        $.ajax = ({
            type: "post",
            url: "http://10.1.17.28:8090/safecity/personInformation",
            data: {
                number: number,
                action: 1
            },
            dataType: "json",
            success: function (data) {
                getData(data);
            }
        });
    };

    //将搜索内容传递给后台
    function find() {
        var area = $("#areaSel option:selected").val();
        //            alert(area);
        var number = $("#people-number").val();
        //            alert(number);

        if (area == "" && number == "") { //1' 两个都没选
            alert("请选择区域或者填写工号！");
            return false;
        } else if (area != "" && number == "") { //2' 只选了区域
            $.ajax({
                type: "post",
                url: "http://10.1.17.28:8090/safecity/personInformation",
                data: {
                    area: area,
                    acton: 1
                },
                dataType: "json",
                success: getData(data)
            })
        } else if (area == "" && number != "") { // 3' 只写了工号
            $.ajax({
                type: "post",
                url: "http://10.1.17.28:8090/safecity/personInformation",
                data: {
                    number: number,
                    acton: 1
                },
                dataType: "json",
                success: getData(data)
            })
        } else { // 4' 既选择了区域，也填写了工号
            $.ajax({
                type: "post",
                url: "http://10.1.17.28:8090/safecity/personInformation",
                data: {
                    number: number, // 传两个值给后台（工号+区域）
                    area: area,
                    acton: 1
                },
                dataType: "json",
                success: getData(data)
            })
        }
    }

    //点击"查看"按钮
    function check(number) {
        var item = $(".item");
        var sel = $(".sel");

        $.ajax = ({
            type: "post",
            url: "http://10.1.17.28:8090/safecity/personInformation",
            data: {
                number: number,
                action: 1
            },
            dataType: "json",
            // 只需要添加一天信息
            success: function (data) {
                getModalData(data);
            }
        });
        //            2'不可修改
        sel.attr("readonly", "readonly");
        item.attr("readonly", "readonly");
    }

    //点击"修改"按钮
    function modify(number) {
        $.ajax = ({
            type: "post",
            url: "http://10.1.17.28:8090/safecity/personInformation",
            data: {
                number: number,
                action: 1
            },
            dataType: "json",
            success: function (data) {
                getModalData(data);
            }
        });
    }