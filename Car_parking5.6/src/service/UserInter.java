package service;

import entity.Users;

public interface UserInter {
	
	/*
	 * ע�����û�
	 * ����user:һ���µ�userʵ��
	 * */
	public void saveUser(Users user)throws Exception;
	
	
	/*
	 * ��¼�ж�
	 * �����û���������
	 * ���ز�ѯ����
	 * */
	public Users getUser(String userName,String password);
	
	//����û��Ƿ����
	public Users checkUser(String userName);
}
