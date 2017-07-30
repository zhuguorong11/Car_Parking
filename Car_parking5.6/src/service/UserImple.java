package service;


import org.hibernate.Session;
import org.hibernate.Transaction;

import sessionFactory.HibernateSessionFactory;
import entity.Users;

public class UserImple implements UserInter{

	//ע�����û�
	public void saveUser(Users user) throws Exception {
		// TODO Auto-generated method stub
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		session.save(user);
		transaction.commit();
		HibernateSessionFactory.closeSession();
	}
	
	//�û���¼
	public Users getUser(String userName, String password) {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "from Users where name='"+userName+"'" +" and password='"+password+"'";
		Users user = (Users) session.createQuery(hql).uniqueResult();
		HibernateSessionFactory.closeSession();
		return user;
	}

	//����û��Ƿ����
	public Users checkUser(String userName) {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "from Users where name='"+userName+"'";
		Users user = (Users) session.createQuery(hql).uniqueResult();
		HibernateSessionFactory.closeSession();
		return user;
	}

}
