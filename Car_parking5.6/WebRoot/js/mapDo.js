/**
 * 对高德map的一些操作
 */
var mapObj;
var marker = new Array();//mark数组
var windowsArr = new Array();//信息窗口数组
var cloudDataLayer;
var MSearch;

//初始化地图对象，加载地图
function mapInit() {
	mapObj = new AMap.Map("iCenter", {
		center : new AMap.LngLat(121.51496737545, 31.298231429954), //地图中心点
		level : 14
	//地图显示的比例尺级别
	});
	AMap.event.addListener(mapObj, 'click', getLnglat); //点击事件
	
	
}
//鼠标点击，获取经纬度坐标
function getLnglat(e) {
	var x = e.lnglat.getLng();
	var y = e.lnglat.getLat();
	document.getElementById("lnglats").innerHTML = x + "," + y;
}
//清空地图
function clearMap() {
	mapObj.clearMap();
	document.getElementById("result").innerHTML = '&nbsp;';
	$("#ajaxInfo").css('display', "none");
	marker = new Array();//mark数组
	windowsArr = new Array();//信息窗口数组
}
function circle(){
	var circle = new AMap.Circle({
		center : cpoint,// 圆心位置
		radius : 1000, //半径
		strokeColor : "#F33", //线颜色
		strokeOpacity : 1, //线透明度
		strokeWeight : 3, //线粗细度
		fillColor : "#ee2200", //填充颜色
		fillOpacity : 0.35
	//填充透明度
	});
	circle.setMap(mapObj);
}

//周边查询函数  当按下搜索按钮的时候 触发该函数
var cpoint = new AMap.LngLat(121.51496737545, 31.298231429954); //搜索查询的中心点设置
function placeSearch2() {
	clearMap();//先清楚之前动作	
	//增加搜索的动作
	ListParks(1);//每一次都是从第一页开始
	//Search_CallBack(parksArray);
	circle();	
}

//添加marker&infowindow  i为标号id
function addmarker(i, d,jishu) {
	var lngX;
	var latY;
	var iName;
	var iAddress;

    lngX = d.longitude;
    latY = d.latitude;
    iName = d.parkname;
    iAddress = d.address;
	var markerOption = {
		map : mapObj,
		icon : "http://webapi.amap.com/images/" + (i + 1) + ".png",
		position : new AMap.LngLat(lngX, latY)
	};
	var mar = new AMap.Marker(markerOption);
	marker.push(new AMap.LngLat(lngX, latY));//各个mark的坐标

	var infoWindow = new AMap.InfoWindow({
		content : "<h5><font color=\"#00a6ac\">" + (i + 1) + ". " + iName
				+ "</font></h5>" + TipContents("", iAddress, ""),
		size : new AMap.Size(300, 0),
		autoMove : true,
		offset : new AMap.Pixel(0, -30)
	});
	windowsArr.push(infoWindow);
	var aa = function(e) {//添加事件
		infoWindow.open(mapObj, mar.getPosition());
		backAjaxInfo(i+1+jishu);
		$("#ajaxInfo").css('display', "block");
	};
	AMap.event.addListener(mar, "click", aa);
}
//回调函数
function Search_CallBack(data,pageindex,pageSize,totalPages) {
	var resultStr = "";
    var dataLen = data.length;
    var pageinfo = "<ul class='pagination'>" +
    "<li><span>第"+pageindex+"页     共"+totalPages+"页</span></li>" +
    "<li><button class='btn btn-default btn-sm' id='shouye' onclick='shouye()'>首页</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='pre' onclick='shang("+(pageindex-1)+")'>上一页</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='next' onclick='xia("+(pageindex+1)+")'>下一页</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='weiye' onclick='weiye("+totalPages+")'>尾页</button></li>" +  
    "</ul>";
    
    var jishu = (pageindex - 1) * pageSize;//为了配合查询数据库
    for (var i = 0; i < dataLen; i++) {
        var park = data[i];//
        resultStr += "<div id='divid" + (jishu + i + 1) + "' onmouseover='openMarkerTipById1(" + (jishu+i+1)+","+jishu+ ",this)'" +
                " onmouseout='onmouseout_MarkerStyle(" + (jishu + i + 1) + ",this)' " +
                "style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; " +
                "border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" +
                "<td><h5><font color=\"#00a6ac\">名称: " + park.parkname + "</font></h5>";
        resultStr += TipContents("", park.address, "") + "</td></tr></table></div>";
        addmarker(i, park,jishu);
        if(i == (dataLen - 1))
        {
            resultStr = resultStr + "<br>" + pageinfo;
        }
    }
	mapObj.setFitView();
	document.getElementById("result").innerHTML = resultStr;
}

function TipContents(type, address, tel) { //窗体内容
	if (type == "" || type == "undefined" || type == null
			|| type == " undefined" || typeof type == "undefined") {
		type = "暂无";
	}
	if (address == "" || address == "undefined" || address == null
			|| address == " undefined" || typeof address == "undefined") {
		address = "暂无";
	}
	if (tel == "" || tel == "undefined" || tel == null || tel == " undefined"
			|| typeof address == "tel") {
		tel = "暂无";
	}
	var str = "&nbsp;&nbsp;地址：" + address + "<br />&nbsp;&nbsp;电话：" + tel
			+ " <br />&nbsp;&nbsp;类型：" + type;
	return str;
}
function openMarkerTipById1(pointid,jishu, thiss) { //根据id 打开搜索结果点tip
	thiss.style.background = '#CAE1FF';
	windowsArr[pointid-jishu-1].open(mapObj, marker[pointid-jishu-1]);
	backAjaxInfo(pointid);//传入parkid
	$("#ajaxInfo").css('display', "block");
}
function onmouseout_MarkerStyle(pointid, thiss) { //鼠标移开后点样式恢复
	thiss.style.background = "";
	//$("#ajaxInfo").css('display',"none");
}
