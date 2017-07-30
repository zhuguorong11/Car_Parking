package action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
import service.UserImple;
import service.UserInter;
import com.opensymphony.xwork2.ActionSupport;
import entity.Users;

public class UserAction extends ActionSupport implements ServletRequestAware,SessionAware {
	HttpServletRequest httpServletRequest;
	String username;
	String password;
	String email;
	String carnumber;
	String info;	
	String loginInfo;
	String checkInfo;

	Map session;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCarnumber() {
		return carnumber;
	}
	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}
	public String getLoginInfo() {
		return loginInfo;
	}
	public void setLoginInfo(String loginInfo) {
		this.loginInfo = loginInfo;
	}
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;
	}
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		this.httpServletRequest = arg0;
	}
	public String getCheckInfo() {
		return checkInfo;
	}
	public void setCheckInfo(String checkInfo) {
		this.checkInfo = checkInfo;
	}
	//����ע��
	public String register() throws Exception{
		username = httpServletRequest.getParameter("username");
		password = httpServletRequest.getParameter("password");
		email = httpServletRequest.getParameter("email");
		carnumber = httpServletRequest.getParameter("carnumber");
		Users user = new Users();
		user.setName(username);
		user.setPassword(password);
		user.setEmail(email);
		user.setCarnumber(carnumber);
		UserInter dbUser = new UserImple();
		dbUser.saveUser(user);
		info = "success";
		return SUCCESS;
	}

	//��¼
	public String userLogin(){
		String userName = httpServletRequest.getParameter("username");
		String password = httpServletRequest.getParameter("password");
		UserInter dbUser = new UserImple();
		Users user = dbUser.getUser(userName, password);
		//���뵽seesion��	
		if(user != null)//���û����ڵ�ʱ��
		{
			session.put("username", user.getName());
			session.put("carnumber", user.getCarnumber());
		}else
		{
			session.put("no", "no");
		}
		return SUCCESS;
	}

	//�ǳ�
	public String userLogout(){
		//���session
		HttpSession session = httpServletRequest.getSession();
		session.invalidate();//���session
		return SUCCESS;
	}
	
	//����û����Ƿ����
	public String checkUserName(){
		String userName = httpServletRequest.getParameter("username");
		UserInter dbUser = new UserImple();
		Users user = dbUser.checkUser(userName);
		if(user != null)
		{
			checkInfo = "has";
		}else {
			checkInfo = "none";
		}
		return SUCCESS;
	}
}
