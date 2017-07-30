/**
 * 
 */
//ajax��Ϣ����,��ѯͣ��λ���
function backAjaxInfo(parkid) {
	//���Է���openMarkerTipById1������
	//console.log("yiruasdasds");
	$.ajax({
		type : "post",
		url : "excuteAjaxJsonAction.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
		data : {//��������Դ
			parkid : parkid
		},
		dataType : "text",//������Ҫ���ص���������
		success : function(json) {
			var d = $.parseJSON(json); //ʹ�������������json
			var info = d.park;
			if(info.type == 0)
			{
			    $("#parktype1").text("����");
			}else
			{
				$("#parktype1").text("����");
			}			
			$("#seatstotal1").text("" + info.total + "");
			$("#remain1").text("" + info.remain + "");
			$("#price1").text("" + info.norprice + "��/h");
			$("#seatselec1").text("" + info.totalelec + "");
			$("#remainelec1").text("" + info.remainelec + "");
			$("#priceelec1").text("" + info.priceelec + "��/h");
			$("td .sub1").attr("id", "btn" + info.parkid);
			$("td .sub2").attr("id", "btne" + info.parkid);
			if (info.remain == 0) {
				//ԤԼ��ťʧЧ
				$(".sub1").attr("disabled", "disabled");
				//alert("��λ��������ѡ������ͣ������");
			}else
			{
				$(".sub1").removeAttr("disabled");
			}

			if (info.remainelec == 0) {
				//ԤԼ��ťʧЧ
				$(".sub2").attr("disabled", "disabled");
				//alert("��λ��������ѡ������ͣ������");
			}else
			{
				$(".sub2").removeAttr("disabled");
			}
		},
		error : function(json) {
			alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
		}//���ﲻҪ��","
	});
}

//��ͨԤԼ��ť
$(".sub1").click(function(e){
	//console.log("��ͨ��ť����");
    var id = e.target.id;//��ȡid btn1
    var len = id.length;
    var parkid = id.substring(3,len);//�õ����ݿ���ͣ����id
    
    $.ajax({
		type : "post",
		url : "updateAjaxJsonAction.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
		data : {//��������Դ
			parkid : parkid,
			type:1
		},
		dataType : "text",//������Ҫ���ص���������
		success : function(json) {
			var d = $.parseJSON(json); //ʹ�������������json
			var info = d.seatInfo;
			//����ԤԼ�ţ���ʱ���
			var timestamp = Date.parse(new Date());
			$(".register").text(timestamp);
			$(".seatsinfo").text(info.seatNum);
			//
			if(info.updateResult != "success"){
				$("#subinfo").text("ԤԼʧ��");
			}else {
				//ԤԼ�ɹ��� �Զ�����
				backAjaxInfo(parkid);
			}
		},
		error : function(json) {
			alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
		}//���ﲻҪ��","
	});
});

//���׮ԤԼ��ť
$(".sub2").click(function(e){
    var id = e.target.id;//��ȡid btn1
    var len = id.length;
    var parkid = id.substring(4,len);//�õ����ݿ���ͣ����id    
    $.ajax({
		type : "post",
		url : "updateAjaxJsonAction.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
		data : {//��������Դ
			parkid : parkid,
			type:2
		},
		dataType : "text",//������Ҫ���ص���������
		success : function(json) {	
			var d = $.parseJSON(json); //ʹ�������������json
			var info = d.seatInfo;
			//����ԤԼ�ţ���ʱ���
			var timestamp = Date.parse(new Date());
			$(".register").text(timestamp);
			$(".seatsinfo").text("���׮"+info.seatNum);
			if(info.updateResult != "success"){
				$("#subinfo").text("ԤԼʧ��");
			}else {
				backAjaxInfo(parkid);
			}
			
		},
		error : function(json) {
			alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
		}//���ﲻҪ��","
	});
});


//�������Ұ�ť�� �����ݿⷵ��ͣ�����б�
function ListParks(pageIndex){	
	$.ajax({
		tpye:"post",
		url:"fenYeAction.action",
		data:{
			pageIndex:pageIndex
		},
		dataType : "text",//������Ҫ���ص���������
		success:function(json){
			//console.log(json);
			var d = $.parseJSON(json); //ʹ�������������json // �õ���Ӧ����һ��page����
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
			alert("�б���ʾ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
		}//���ﲻҪ��","
	});
}

//�ص���ҳ
function shouye(){
	//���ԭ�е�mark�ȶ���
	//������mapDo.js��
	clearMap();
	ListParks(1);
	circle();
}
//��һҳ
function shang(index){
	clearMap();
	ListParks(index);
	circle();
}
//��һҳ
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

