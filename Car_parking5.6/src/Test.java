
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import sessionFactory.HibernateSessionFactory;
import entity.Parks;
import entity.Seats;
import entity.Users;


public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Session session = HibernateSessionFactory.getSession();
	    Transaction transaction = session.beginTransaction();
	    
	    
		transaction.commit();
		HibernateSessionFactory.closeSession();
		System.out.println("≤Â»ÎΩ· ¯");
	}

}
