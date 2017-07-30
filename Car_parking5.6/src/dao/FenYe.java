package dao;

import java.util.List;

import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.Transaction;

import org.hibernate.Query;
import org.hibernate.Session;

import entity.Parks;
import sessionFactory.HibernateSessionFactory;

public class FenYe {
	// 查询所有房屋
	public List<Parks> selecthouse() throws Exception {
		// TODO Auto-generated method stub
		Session session = HibernateSessionFactory.getSession();
		// 开启事物
		Transaction transaction = (Transaction) session.beginTransaction();
		String hql = "from House";
		Query q = session.createQuery(hql);
		List<Parks> list = q.list();
		transaction.commit();
		return list;
	}

	// 房屋总数除于要分的条数
	public int getTotalPages(int count, int pageSize) {
		int totalpages = 0;
		totalpages = (count % pageSize == 0) ? (count / pageSize) : (count
				/ pageSize + 1);
		return totalpages;
	}

	// 获取房屋总条数
	public int getConut() throws Exception{
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = (Transaction) session.beginTransaction();
		String hql = "select count(*) from Parks";
		Query q = session.createQuery(hql);
		List list = q.list();
		transaction.commit();
		String li = list.get(0).toString();
		Integer count = Integer.parseInt(li);
		return count;
	}

	public List<Parks> selechouse(int pageIndex, int pageSize)throws Exception {
		// TODO Auto-generated method stub
		Session session = HibernateSessionFactory.getSession();
		// 开启事物
		Transaction transaction = (Transaction) session.beginTransaction();
		String hql = "from House";
		Query query = session.createQuery(hql);
		query.setFirstResult((pageIndex - 1) * pageSize);
		query.setMaxResults(pageSize);
		List<Parks> parkList = query.list();
		transaction.commit();
		return parkList;
	}
}
