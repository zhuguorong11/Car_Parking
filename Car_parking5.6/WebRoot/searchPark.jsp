<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>五角场停车场</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<title>五角场车位情况</title>
<link rel="stylesheet" href="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/mystyle.css" />
<script
	src="https://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script
	src="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<!--  <script type="text/javascript" src="js/jquery.js"></script>-->
<script type="text/javascript"
	src="http://webapi.amap.com/maps?v=1.3&key=5377db18b9748649f457de79c74d78fd"></script>
</head>
<body onLoad="mapInit()">
	<%
	if(session.getAttribute("username") != null)
	{
	%>
	<div style="background-color: #CCCCCC; width: 1020px;">
		<marquee direction="right" style="position: absolute;top: 6px;width: 1020px;">五角场停车场</marquee>
		<div style="position: relative;left: 890px;width: 1020px;">			
			欢迎您<span class="glyphicon glyphicon-user"></span><%=session.getAttribute("username")%>
			<button type="button" class="btn btn-default btn-sm"><a href="userLogout.action"><span style="font-size:10px;">退出</span></a></button>
		</div>
	</div>
	<%
	}else
	{
	%>
	<div style="background-color: #CCCCCC; width: 1020px;">
		<marquee direction="right" style="position: absolute;top: 15px;width: 1020px;">五角场停车场</marquee>
		<ul id="aaa" class="nav nav-pills">
			<li style="margin: 10px;">
				<button type="button" class="btn btn-default btn-sm"
					data-toggle="modal" data-target="#login">
					<span class="glyphicon glyphicon-user"></span>登录
				</button>
			</li>
			<li style="margin: 10px;">
				<button type="button" class="btn btn-default btn-sm"
					data-toggle="modal" data-target="#regist" id="regbtn">
					<span class="glyphicon glyphicon-hand-right"></span>注册
				</button>
			</li>
			<li style="margin: 10px;">
				<button class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="登录即可搜索停车场">
					<span class="glyphicon  glyphicon-question-sign"></span>帮助
					
				</button>
			</li>
		</ul>
	</div>
	<% 
		}
	%>
	
	<!-- 登录模态框（Modal） -->
	<div class="modal fade" id="login" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" id="logindivmodal"> 
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title" id="loginmodallabel" style="position: relative;left: 160px;">登录</h3>
				</div>
				<img id="imgloading" src="5-121204193R0.gif" style="display:none;position: relative;left:180px;">
				<div class="modal-body" id="subinfo" style="position: relative;left: 20px;">
					<form class="bs-example bs-example-form" role="form" id="loginform" action="userLogin.action" method="post">
						<div class="input-group" id="userdiv">
							<span class="input-group-addon glyphicon glyphicon-user"></span> 
							<input type="text" class="form-control" name="username" id="username" placeholder="twitterhandle">						
						</div>
						<p id="userhas" style="position: relative;left: 120px;color: red"></p>
						<br>
						<div class="input-group" id="pwddiv">
							<span class="input-group-addon glyphicon glyphicon-lock"></span>
							<input type="password" class="form-control" name="password" id="password"> 							
						</div>
						<br>
						<div style="position: relative;left: 120px;">
							<input type="submit" class="btn btn-primary" id="loginbotton" value="登录">
							<button type="button" class="btn btn-default" data-dismiss="modal" id="modalclose">关闭</button>	
						</div>
					</form>
				</div>			
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	<!-- 注册模态框（Modal） -->
	<div class="modal fade" id="regist" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" id="regdivmodal">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title" id="regmodallabel" style="position: relative;left: 180px;">新用户注册</h3>
				</div>
				<div class="modal-body" id="subinfo">
					<form class="bs-example bs-example-form" role="form" id="registerform" method="post" action="#">
						<div class="input-group" style="position: relative;left: 80px;" id="userdiv">
							<span class="input-group-addon"25px;">用&nbsp;&nbsp;户&nbsp;&nbsp;名</span> 
							<input type="text" class="form-control active" id="registname" placeholder="twitterhandle">
							<p class="input-group-addon" id="reginfo1"></p>
						</div>
						<br>
						<div class="input-group" style="position: relative;left: 80px;" id="pwddiv">
							<span class="input-group-addon">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码</span>
							<input type="password" class="form-control" id="registpwd"> 		
							<p class="input-group-addon" id="reginfo2"></p>					
						</div>
						<br>
						<div class="input-group" style="position: relative;left: 80px;" id="pwddiv">
							<span class="input-group-addon">确认密码</span>
							<input type="password" class="form-control" id="pwdtwice"> 	
							<p class="input-group-addon" id="reginfotwo"></p>							
						</div>
						<br>
						<div class="input-group" style="position: relative;left: 80px;" id="pwddiv">
							<span class="input-group-addon">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 箱</span>
							<input type="email" class="form-control" id="useremail"> 	
							<p class="input-group-addon" id="reginfo3"></p>							
						</div>
						<br>
						<div class="input-group" style="position: relative;left: 80px;" id="pwddiv">
							<span class="input-group-addon">车&nbsp;		牌&nbsp;		号</span>
							<input type="text" class="form-control" id="carnumber" placeholder="沪A12345"> 
							<p class="input-group-addon" id="reginfo4"></p>								
						</div>
						<br>					
					</form>
				</div>		
				<div class="modal-footer">
					<div style="position: relative;right: 180px;">
							<button type="submit" class="btn btn-primary" data-dismiss="modal" id="registerbotton" data-toggle="modal"
										data-target="#reisterSuccess">注册</button>
							<button type="button" class="btn btn-default" data-dismiss="modal" id="modalclose">关闭</button>	
					</div>
				</div>	
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	<!-- 弹出注册情况 -->
	<div class="modal fade" id="reisterSuccess" tabindex="-10" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="reginfo">恭喜，注册成功</h4>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						id="modalclose">关闭</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	<div id="iCenter"></div>
	<table id="iControlbox" border="1">
		<tr style="height: 100px">
			<td>
				<div>
					<p>
						坐标：<span id="lnglats">&nbsp;</span>
					</p>
					<ul>
						<li>
						<% 
						if(session.getAttribute("username") != null)//当登录的时候才能进行搜索
						{
						%>
							<button class="btn btn-primary"
								onclick="javascript:placeSearch2();">
								<span class="glyphicon glyphicon-search"></span>停车场搜索
							</button>
						<%
						}else{
						%>
							<button class="btn btn-primary" disabled="disabled"
								onclick="javascript:placeSearch2();">
								<span class="glyphicon glyphicon-search"></span>停车场搜索
							</button>
						<%
						}
						%>
							<button class="btn btn-primary" onclick="javascript:clearMap();">清空地图</button>
						</li>
					</ul>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div id="ajaxInfo">
					<table class="table table-striped">
						<caption>停车场信息</caption>
						<tbody>
							<tr>
								<td><span class="infolabel">停车场类型:</span></td>
								<td><span class="parktype" id="parktype1">暂无信息</span></td>
							</tr>
							<tr>
								<td><span class="infolabel">普通车位总数:</span></td>
								<td><span class="seatstotal" id="seatstotal1">暂无信息</span></td>
							</tr>
							<tr>
								<td><span class="infolabel">剩余:</span></td>
								<td><span class="remain" id="remain1">暂无信息</span></td>

							</tr>
							<tr>
								<td><span class="infolabel">单价:</span></td>
								<td><span class="price" id="price1">暂无信息</span></td>
							</tr>
							<tr>
								<td><span class="infolabel">充电桩总数:</span></td>
								<td><span class="seatselec" id="seatselec1">暂无信息</span></td>
							</tr>
							<tr>
								<td><span class="infolabel">剩余:</span></td>
								<td><span class="remainelec" id="remainelec1">暂无信息</span></td>

							</tr>
							<tr>
								<td><span class="infolabel">单价:</span></td>
								<td><span class="priceelec" id="priceelec1">暂无信息</span></td>
							</tr>
							<tr>
								<td><button type="button"
										class="sub1 btn btn-primary btn-sm" data-toggle="modal"
										data-target="#myModal">普通预约</button></td>
								<td><button type="button"
										class="sub2 btn btn-primary btn-sm" data-toggle="modal"
										data-target="#myModal">充电桩预约</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
		</tr>
	</table>

	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">预约情况</h4>
				</div>
				<div class="modal-body" id="subinfo">
					<p>预约成功</p>
					<p>
						预约号：<span class="register"></span>
					</p>
					<p>
						预约车位：<span class="seatsinfo"></span>
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						id="modalclose">关闭</button>
					<button type="button" class="btn btn-primary">提交更改</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<div id="result"></div>
	<!-- tongji begin-->
	<!-- <script type="text/javascript">
		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://"
				: " http://");
		document
				.write(unescape("%3Cscript src='"
						+ _bdhmProtocol
						+ "hm.baidu.com/h.js%3Faeff88f19045b513af7681b011cea3bd' type='text/javascript'%3E%3C/script%3E"));
	</script> -->
	<!-- tongji end -->
	<script>
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
	</script>
	
	<script language="javascript" type="text/javascript" src="js/UserJs.js"
		charset="GBK"></script>
	<script language="javascript" type="text/javascript" src="js/mapDo.js"
		charset="GBK"></script>
	<script language="javascipt" type="text/javascript" src="js/ParkSeats.js"
		charset="GBK"></script>
		
</body>

</html>
