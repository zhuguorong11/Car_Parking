/**
 * 
 */
//ajax信息交互,查询停车位情况
function backAjaxInfo(parkid) {
	//可以放在openMarkerTipById1函数里
	//console.log("yiruasdasds");
	$.ajax({
		type : "post",
		url : "excuteAjaxJsonAction.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
		data : {//设置数据源
			parkid : parkid
		},
		dataType : "text",//设置需要返回的数据类型
		success : function(json) {
			var d = $.parseJSON(json); //使用这个方法解析json
			var info = d.park;
			if(info.type == 0)
			{
			    $("#parktype1").text("室外");
			}else
			{
				$("#parktype1").text("室内");
			}			
			$("#seatstotal1").text("" + info.total + "");
			$("#remain1").text("" + info.remain + "");
			$("#price1").text("" + info.norprice + "￥/h");
			$("#seatselec1").text("" + info.totalelec + "");
			$("#remainelec1").text("" + info.remainelec + "");
			$("#priceelec1").text("" + info.priceelec + "￥/h");
			$("td .sub1").attr("id", "btn" + info.parkid);
			$("td .sub2").attr("id", "btne" + info.parkid);
			if (info.remain == 0) {
				//预约按钮失效
				$(".sub1").attr("disabled", "disabled");
				//alert("车位已满，请选择其他停车场！");
			}else
			{
				$(".sub1").removeAttr("disabled");
			}

			if (info.remainelec == 0) {
				//预约按钮失效
				$(".sub2").attr("disabled", "disabled");
				//alert("车位已满，请选择其他停车场！");
			}else
			{
				$(".sub2").removeAttr("disabled");
			}
		},
		error : function(json) {
			alert("系统异常，请稍后重试！" + $.parseJSON(json));
		}//这里不要加","
	});
}

//普通预约按钮
$(".sub1").click(function(e){
	//console.log("普通按钮按下");
    var id = e.target.id;//获取id btn1
    var len = id.length;
    var parkid = id.substring(3,len);//得到数据库中停车场id
    
    $.ajax({
		type : "post",
		url : "updateAjaxJsonAction.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
		data : {//设置数据源
			parkid : parkid,
			type:1
		},
		dataType : "text",//设置需要返回的数据类型
		success : function(json) {
			var d = $.parseJSON(json); //使用这个方法解析json
			var info = d.seatInfo;
			//生成预约号，以时间戳
			var timestamp = Date.parse(new Date());
			$(".register").text(timestamp);
			$(".seatsinfo").text(info.seatNum);
			//
			if(info.updateResult != "success"){
				$("#subinfo").text("预约失败");
			}else {
				//预约成功后 自动更新
				backAjaxInfo(parkid);
			}
		},
		error : function(json) {
			alert("系统异常，请稍后重试！" + $.parseJSON(json));
		}//这里不要加","
	});
});

//充电桩预约按钮
$(".sub2").click(function(e){
    var id = e.target.id;//获取id btn1
    var len = id.length;
    var parkid = id.substring(4,len);//得到数据库中停车场id    
    $.ajax({
		type : "post",
		url : "updateAjaxJsonAction.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
		data : {//设置数据源
			parkid : parkid,
			type:2
		},
		dataType : "text",//设置需要返回的数据类型
		success : function(json) {	
			var d = $.parseJSON(json); //使用这个方法解析json
			var info = d.seatInfo;
			//生成预约号，以时间戳
			var timestamp = Date.parse(new Date());
			$(".register").text(timestamp);
			$(".seatsinfo").text("充电桩"+info.seatNum);
			if(info.updateResult != "success"){
				$("#subinfo").text("预约失败");
			}else {
				backAjaxInfo(parkid);
			}
			
		},
		error : function(json) {
			alert("系统异常，请稍后重试！" + $.parseJSON(json));
		}//这里不要加","
	});
});


//按下所艘按钮好 从数据库返回停车场列表
function ListParks(pageIndex){	
	$.ajax({
		tpye:"post",
		url:"fenYeAction.action",
		data:{
			pageIndex:pageIndex
		},
		dataType : "text",//设置需要返回的数据类型
		success:function(json){
			//console.log(json);
			var d = $.parseJSON(json); //使用这个方法解析json // 得到的应该是一个page独享
			var pages = d.pages;
			var index = pages.currentPage;
			var pageSize = pages.pageSize;
			var totalPages = pages.totalPages;
			var parksList = pages.parkList;
			Search_CallBack(parksList,index,pageSize,totalPages);
			if(index == 1)
			{
				$("#pre").attr("disabled", "disabled");
				$("#pre").siblings("button").removeAttr("disabled");
			}
			if(index == totalPages)
			{
				$("#next").attr("disabled", "disabled");
				$("#next").siblings("button").removeAttr("disabled");
			}
		},
		error : function(json) {
			alert("列表显示异常，请稍后重试！" + $.parseJSON(json));
		}//这里不要加","
	});
}

//回到首页
function shouye(){
	//清除原有的mark等东西
	//函数在mapDo.js里
	clearMap();
	ListParks(1);
	circle();
}
//上一页
function shang(index){
	clearMap();
	ListParks(index);
	circle();
}
//下一页
function xia(index){
	clearMap();
	ListParks(index);
	circle();
}
function weiye(index){
	clearMap();
	ListParks(index);
	circle();
}

