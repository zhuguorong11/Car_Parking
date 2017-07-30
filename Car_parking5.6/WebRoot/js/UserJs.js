/**
 * 
 */

var submit1 = 0;
var submit2 = 0;
var submit3 = 0;
var submit4 = 0;
var submit5 = 0;

//�û���У��
$("#registname").blur(function(){
	var name = $("#registname").val();
	if(name.length == 0)
	{
		$("#registname").focus();
		$("#reginfo1").text("�������û���");
		submit1 = 0;
		console.log(submit);
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo1").text("");
		$("#reginfo1").append(span);
		submit1 = 1;
	}
});
//����û����Ƿ����
$("#registname").blur(function(){
	var name = $("#registname").val();
	$.ajax({
		type : "post",
		url : "checkUserName.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
		data : {//��������Դ
			username : name
		},
		dataType : "text",//������Ҫ���ص���������
		success : function(json) {
			var d = $.parseJSON(json); //ʹ�������������json
			var info = d.checkInfo;
			if(info == "has")//��ʾ�Ѿ����ڸ��û���
			{
				$("#reginfo1").text("�û��Ѵ���");
				submit1 = 0;
			}else
			{
				var span = "<span class='glyphicon glyphicon-ok'></span>";
				$("#reginfo1").text("");
				$("#reginfo1").append(span);
				submit1 = 1;
			}
		},
		error : function(json) {
			alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
		}
	});
});


//����У��
$("#registpwd").blur(function(){
	var pwd = $("#registpwd").val();//����
	if(pwd.length <= 6)
	{
		$("#registname").focus();
		$("#reginfo2").text("�������6λ");
		submit2 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo2").text("");
		$("#reginfo2").append(span);
		submit2 = 1;
	}
});
//����ȷ��
$("#pwdtwice").blur(function(){
	var pwdtwice = $("#pwdtwice").val();
	var pwd = $("#registpwd").val();//����
	if(pwdtwice != pwd)
	{
		$("#registname").focus();
		$("#reginfotwo").text("�������벻ͬ");	
		submit3 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfotwo").text("");
		$("#reginfotwo").append(span);
		submit3 = 1;
	}
});
//����У��
$("#useremail").blur(function(){
	var email = $("#useremail").val();
	if( email.indexOf("@") == -1)
	{
		$("#registname").focus();
		$("#reginfo3").text("���䲻�Ϸ�");
		submit4 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo3").text("");
		$("#reginfo3").append(span);
		submit4 = 1;
	}
});
//����У��
$("#carnumber").blur(function(){
	var email = $("#carnumber").val();
	if( email.length == 0)
	{
		$("#registname").focus();
		$("#reginfo4").text("���Ʋ��ܿ�");
		submit5 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo4").text("");
		$("#reginfo4").append(span);
		submit5 = 1;
	}
	
	if(email.length <= 6)
	{
		$("#registname").focus();
		$("#reginfo4").text("���Ʋ��Ϸ�");
		submit5 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo4").text("");
		$("#reginfo4").append(span);
		submit5 = 1;
	}
});


//ע��
$("#registerbotton").click(function(){
	var username = $("#registname").val();
	var password = $("#registpwd").val();
	var pwdtwice = $("#pwdtwice").val();
	var email = $("#useremail").val();
	var carnumber = $("#carnumber").val();
	//���������������󴥷��ύ
	if(submit1 == 1 && submit2 == 1 && submit3 == 1 && submit4 == 1 && submit5 == 1)
	{
		$("#registerbotton").attr("data-dismiss","modal");
		$.ajax({
			type : "post",
			url : "useRegister.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
			data : {//��������Դ
				username : username,
				password : password,
				email : email,
				carnumber : carnumber
			},
			dataType : "text",//������Ҫ���ص���������
			success : function(json) {
				var d = $.parseJSON(json); //ʹ�������������json
				var info = d.info;
				console.log(info);
				if(info != "success")
				{
					$("#reginfo").text("ע��ʧ��");
				}else
				{
					$("#reginfo").text("ע��ɹ���");
				}
			},
			error : function(json) {
				alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
			}
		});	
	}
	else
	{
		$("#registerbotton").removeAttr("data-dismiss");
		$("#reginfo").text("��������дע����Ϣ");
		return;
	}
	
});

//��¼ʱ�ȼ���û����Ƿ����
$("#username").blur(function(){
	var name = $("#username").val();
	if(name.length != 0){
		$.ajax({
			type : "post",
			url : "checkUserName.action",//��Ҫ��������ajax�����action,excuteAjaxΪ����ķ�������JsonActionΪaction��
			data : {//��������Դ
				username : name
			},
			dataType : "text",//������Ҫ���ص���������
			success : function(json) {
				var d = $.parseJSON(json); //ʹ�������������json
				var info = d.checkInfo;
				if(info != "has")//��ʾ�Ѿ����ڸ��û���
				{
					$("#userhas").text("�û���������");
					$("#username").focus();
				}else
				{
					$("#userhas").text("");
				}
			},
			error : function(json) {
				alert("ϵͳ�쳣�����Ժ����ԣ�" + $.parseJSON(json));
			}
		});
	}
});

$("#loginbotton").click(function(){
	$("#imgloading").attr("display","block");
});