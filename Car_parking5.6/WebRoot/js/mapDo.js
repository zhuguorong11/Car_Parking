/**
 * �Ըߵ�map��һЩ����
 */
var mapObj;
var marker = new Array();//mark����
var windowsArr = new Array();//��Ϣ��������
var cloudDataLayer;
var MSearch;

//��ʼ����ͼ���󣬼��ص�ͼ
function mapInit() {
	mapObj = new AMap.Map("iCenter", {
		center : new AMap.LngLat(121.51496737545, 31.298231429954), //��ͼ���ĵ�
		level : 14
	//��ͼ��ʾ�ı����߼���
	});
	AMap.event.addListener(mapObj, 'click', getLnglat); //����¼�
	
	
}
//���������ȡ��γ������
function getLnglat(e) {
	var x = e.lnglat.getLng();
	var y = e.lnglat.getLat();
	document.getElementById("lnglats").innerHTML = x + "," + y;
}
//��յ�ͼ
function clearMap() {
	mapObj.clearMap();
	document.getElementById("result").innerHTML = '&nbsp;';
	$("#ajaxInfo").css('display', "none");
	marker = new Array();//mark����
	windowsArr = new Array();//��Ϣ��������
}
function circle(){
	var circle = new AMap.Circle({
		center : cpoint,// Բ��λ��
		radius : 1000, //�뾶
		strokeColor : "#F33", //����ɫ
		strokeOpacity : 1, //��͸����
		strokeWeight : 3, //�ߴ�ϸ��
		fillColor : "#ee2200", //�����ɫ
		fillOpacity : 0.35
	//���͸����
	});
	circle.setMap(mapObj);
}

//�ܱ߲�ѯ����  ������������ť��ʱ�� �����ú���
var cpoint = new AMap.LngLat(121.51496737545, 31.298231429954); //������ѯ�����ĵ�����
function placeSearch2() {
	clearMap();//�����֮ǰ����	
	//���������Ķ���
	ListParks(1);//ÿһ�ζ��Ǵӵ�һҳ��ʼ
	//Search_CallBack(parksArray);
	circle();	
}

//���marker&infowindow  iΪ���id
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
	marker.push(new AMap.LngLat(lngX, latY));//����mark������

	var infoWindow = new AMap.InfoWindow({
		content : "<h5><font color=\"#00a6ac\">" + (i + 1) + ". " + iName
				+ "</font></h5>" + TipContents("", iAddress, ""),
		size : new AMap.Size(300, 0),
		autoMove : true,
		offset : new AMap.Pixel(0, -30)
	});
	windowsArr.push(infoWindow);
	var aa = function(e) {//����¼�
		infoWindow.open(mapObj, mar.getPosition());
		backAjaxInfo(i+1+jishu);
		$("#ajaxInfo").css('display', "block");
	};
	AMap.event.addListener(mar, "click", aa);
}
//�ص�����
function Search_CallBack(data,pageindex,pageSize,totalPages) {
	var resultStr = "";
    var dataLen = data.length;
    var pageinfo = "<ul class='pagination'>" +
    "<li><span>��"+pageindex+"ҳ     ��"+totalPages+"ҳ</span></li>" +
    "<li><button class='btn btn-default btn-sm' id='shouye' onclick='shouye()'>��ҳ</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='pre' onclick='shang("+(pageindex-1)+")'>��һҳ</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='next' onclick='xia("+(pageindex+1)+")'>��һҳ</button></li>" +
    "<li><button class='btn btn-default btn-sm' id='weiye' onclick='weiye("+totalPages+")'>βҳ</button></li>" +  
    "</ul>";
    
    var jishu = (pageindex - 1) * pageSize;//Ϊ����ϲ�ѯ���ݿ�
    for (var i = 0; i < dataLen; i++) {
        var park = data[i];//
        resultStr += "<div id='divid" + (jishu + i + 1) + "' onmouseover='openMarkerTipById1(" + (jishu+i+1)+","+jishu+ ",this)'" +
                " onmouseout='onmouseout_MarkerStyle(" + (jishu + i + 1) + ",this)' " +
                "style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; " +
                "border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" +
                "<td><h5><font color=\"#00a6ac\">����: " + park.parkname + "</font></h5>";
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

function TipContents(type, address, tel) { //��������
	if (type == "" || type == "undefined" || type == null
			|| type == " undefined" || typeof type == "undefined") {
		type = "����";
	}
	if (address == "" || address == "undefined" || address == null
			|| address == " undefined" || typeof address == "undefined") {
		address = "����";
	}
	if (tel == "" || tel == "undefined" || tel == null || tel == " undefined"
			|| typeof address == "tel") {
		tel = "����";
	}
	var str = "&nbsp;&nbsp;��ַ��" + address + "<br />&nbsp;&nbsp;�绰��" + tel
			+ " <br />&nbsp;&nbsp;���ͣ�" + type;
	return str;
}
function openMarkerTipById1(pointid,jishu, thiss) { //����id �����������tip
	thiss.style.background = '#CAE1FF';
	windowsArr[pointid-jishu-1].open(mapObj, marker[pointid-jishu-1]);
	backAjaxInfo(pointid);//����parkid
	$("#ajaxInfo").css('display', "block");
}
function onmouseout_MarkerStyle(pointid, thiss) { //����ƿ������ʽ�ָ�
	thiss.style.background = "";
	//$("#ajaxInfo").css('display',"none");
}
