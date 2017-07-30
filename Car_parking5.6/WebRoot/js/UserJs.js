/**
 * 
 */

var submit1 = 0;
var submit2 = 0;
var submit3 = 0;
var submit4 = 0;
var submit5 = 0;

//用户名校验
$("#registname").blur(function(){
	var name = $("#registname").val();
	if(name.length == 0)
	{
		$("#registname").focus();
		$("#reginfo1").text("请输入用户名");
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
//检查用户名是否存在
$("#registname").blur(function(){
	var name = $("#registname").val();
	$.ajax({
		type : "post",
		url : "checkUserName.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
		data : {//设置数据源
			username : name
		},
		dataType : "text",//设置需要返回的数据类型
		success : function(json) {
			var d = $.parseJSON(json); //使用这个方法解析json
			var info = d.checkInfo;
			if(info == "has")//表示已经存在该用户名
			{
				$("#reginfo1").text("用户已存在");
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
			alert("系统异常，请稍后重试！" + $.parseJSON(json));
		}
	});
});


//密码校验
$("#registpwd").blur(function(){
	var pwd = $("#registpwd").val();//密码
	if(pwd.length <= 6)
	{
		$("#registname").focus();
		$("#reginfo2").text("密码大于6位");
		submit2 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo2").text("");
		$("#reginfo2").append(span);
		submit2 = 1;
	}
});
//密码确认
$("#pwdtwice").blur(function(){
	var pwdtwice = $("#pwdtwice").val();
	var pwd = $("#registpwd").val();//密码
	if(pwdtwice != pwd)
	{
		$("#registname").focus();
		$("#reginfotwo").text("两次密码不同");	
		submit3 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfotwo").text("");
		$("#reginfotwo").append(span);
		submit3 = 1;
	}
});
//邮箱校验
$("#useremail").blur(function(){
	var email = $("#useremail").val();
	if( email.indexOf("@") == -1)
	{
		$("#registname").focus();
		$("#reginfo3").text("邮箱不合法");
		submit4 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo3").text("");
		$("#reginfo3").append(span);
		submit4 = 1;
	}
});
//车牌校验
$("#carnumber").blur(function(){
	var email = $("#carnumber").val();
	if( email.length == 0)
	{
		$("#registname").focus();
		$("#reginfo4").text("车牌不能空");
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
		$("#reginfo4").text("车牌不合法");
		submit5 = 0;
	}else
	{
		var span = "<span class='glyphicon glyphicon-ok'></span>";
		$("#reginfo4").text("");
		$("#reginfo4").append(span);
		submit5 = 1;
	}
});


//注册
$("#registerbotton").click(function(){
	var username = $("#registname").val();
	var password = $("#registpwd").val();
	var pwdtwice = $("#pwdtwice").val();
	var email = $("#useremail").val();
	var carnumber = $("#carnumber").val();
	//当满足所有条件后触发提交
	if(submit1 == 1 && submit2 == 1 && submit3 == 1 && submit4 == 1 && submit5 == 1)
	{
		$("#registerbotton").attr("data-dismiss","modal");
		$.ajax({
			type : "post",
			url : "useRegister.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
			data : {//设置数据源
				username : username,
				password : password,
				email : email,
				carnumber : carnumber
			},
			dataType : "text",//设置需要返回的数据类型
			success : function(json) {
				var d = $.parseJSON(json); //使用这个方法解析json
				var info = d.info;
				console.log(info);
				if(info != "success")
				{
					$("#reginfo").text("注册失败");
				}else
				{
					$("#reginfo").text("注册成功！");
				}
			},
			error : function(json) {
				alert("系统异常，请稍后重试！" + $.parseJSON(json));
			}
		});	
	}
	else
	{
		$("#registerbotton").removeAttr("data-dismiss");
		$("#reginfo").text("请认真填写注册信息");
		return;
	}
	
});

//登录时先检查用户名是否存在
$("#username").blur(function(){
	var name = $("#username").val();
	if(name.length != 0){
		$.ajax({
			type : "post",
			url : "checkUserName.action",//需要用来处理ajax请求的action,excuteAjax为处理的方法名，JsonAction为action名
			data : {//设置数据源
				username : name
			},
			dataType : "text",//设置需要返回的数据类型
			success : function(json) {
				var d = $.parseJSON(json); //使用这个方法解析json
				var info = d.checkInfo;
				if(info != "has")//表示已经存在该用户名
				{
					$("#userhas").text("用户名不存在");
					$("#username").focus();
				}else
				{
					$("#userhas").text("");
				}
			},
			error : function(json) {
				alert("系统异常，请稍后重试！" + $.parseJSON(json));
			}
		});
	}
});

$("#loginbotton").click(function(){
	$("#imgloading").attr("display","block");
});