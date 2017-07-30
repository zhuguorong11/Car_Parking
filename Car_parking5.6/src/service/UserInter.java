package service;

import entity.Users;

public interface UserInter {
	
	/*
	 * 注册新用户
	 * 参数user:一个新的user实例
	 * */
	public void saveUser(Users user)throws Exception;
	
	
	/*
	 * 登录判断
	 * 参数用户名和密码
	 * 返回查询到的
	 * */
	public Users getUser(String userName,String password);
	
	//检查用户是否存在
	public Users checkUser(String userName);
}
