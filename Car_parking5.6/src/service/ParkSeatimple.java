package service;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import sessionFactory.HibernateSessionFactory;
import entity.Page;
import entity.Parks;
import entity.Seats;
import entity.SeatInfo;

//���ݿ����
public class ParkSeatimple implements ParkSeatInter {
	SeatInfo seatInfo;

	public Parks queryParkRes(int id) {
		Parks park = new Parks();
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hqlString = "from Parks where parkid=" + id; // Ҫִ�е�SQL
		Parks parks = (Parks) session.createQuery(hqlString).uniqueResult();
		transaction.commit();
		park.setParkid(parks.getParkid());
		park.setType(parks.getType());
		park.setTotal(parks.getTotal());
		park.setRemain(parks.getRemain());
		park.setNorprice(parks.getNorprice());
		park.setTotalelec(parks.getTotalelec());
		park.setRemainelec(parks.getRemainelec());
		park.setPriceelec(parks.getPriceelec());
		HibernateSessionFactory.closeSession();
		return park;
	}

	// ����ʣ����λ��
	public String updateRemain(int id, String type) {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "";
		if (type.equals("1"))
			hql = "update Parks p set p.remain = p.remain-1 where p.parkid = "
					+ id;
		else
			hql = "update Parks p set p.remainelec = p.remainelec-1 where p.parkid = "
					+ id;
		Query query = session.createQuery(hql);
		// query.setParameter(1, id);
		int i = query.executeUpdate();
		transaction.commit();
		HibernateSessionFactory.closeSession();
		if (i == 1) {
			return "success";
		} else {
			return "fail";
		}
	}

	// seats����� typeΪ��λ���� 2������׮
	public int getSubNum(int id, String type,String carnumber) {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "";
		int typeG = Integer.parseInt(type);
		hql = "from Parks where parkid=" + id;// ���׮
		int total = 0;
		Parks p = (Parks) session.createQuery(hql).uniqueResult();
		if (typeG == 1)
			total = p.getTotal();// �����Ӧ��λ����
		else
			total = p.getTotalelec();

		int ranmdSeatNum = new Random().nextInt(total);// ������һ����λ��
		ranmdSeatNum += 1;
		hql = "from Seats s where s.parks.parkid = " + id + " and s.seatnum = "
				+ ranmdSeatNum + " and s.type = " + (typeG - 1);
		int state = 0;// ��λ״̬
		Seats seats = (Seats) session.createQuery(hql).uniqueResult();
		state = seats.getState();
		while (state == 1) {
			ranmdSeatNum = new Random().nextInt(total);// ������һ����λ��
			ranmdSeatNum += 1;
			hql = "from Seats s where s.parks.parkid = " + id
					+ " and s.seatnum = " + ranmdSeatNum + " and s.type = "
					+ (typeG - 1);
			seats = (Seats) session.createQuery(hql).uniqueResult();
			state = seats.getState();
		}
		transaction.commit();
		HibernateSessionFactory.closeSession();

		updateSeatState(id, ranmdSeatNum, type,carnumber);
		return ranmdSeatNum;
	}

	// ������λ״̬
	public void updateSeatState(int parkid, int seatnum, String type,String carnumber) {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "";
		int typeG = Integer.parseInt(type);
		typeG -= 1;
		// ����ʱ��
		Date rentDate = new Date();
		Date rentTime = new Date();
		hql = "from Seats s where s.parks.parkid = " + parkid
				+ " and s.seatnum = " + seatnum + " and s.type = " + typeG;
		Seats seats = (Seats) session.createQuery(hql).uniqueResult();
		seats.setState(1);
		seats.setRentdate(rentDate);
		seats.setRenttime(rentTime);
		seats.setCarnumber(carnumber);
		seats.setUsetotal(seats.getUsetotal()+1);
		session.save(seats);
		transaction.commit();
		HibernateSessionFactory.closeSession();
	}

	public SeatInfo getSeatMes(int id, String type,String carnumber) {
		seatInfo = new SeatInfo();
		seatInfo.seatNum = getSubNum(id, type,carnumber);
		seatInfo.updateResult = updateRemain(id, type);
		return seatInfo;
	}

	// ���ص�ǰҳ��ͣ����
	public Page parksAppear(int pageIndex, int pageSize,int totalPages) {
		System.out.println();// ��ҳ������ʼ
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = session.beginTransaction();
		String hql = "from Parks";
		Query query = session.createQuery(hql);
		query.setFirstResult(pageSize * (pageIndex - 1));
		query.setMaxResults(pageSize);
		List<Parks> listPark = query.list();
		transaction.commit();
		Page page = new Page();
		page.setCurrentPage(pageIndex);
		page.setPageSize(pageSize);
		page.setParkList(listPark);
		page.setTotalPages(totalPages);
		System.out.println();// ��ҳ��������
		return page;
	}

	// �ܼ�¼����
	public int getConut() throws Exception {
		Session session = HibernateSessionFactory.getSession();
		Transaction transaction = (Transaction) session.beginTransaction();
		String hql = "select count(*) from Parks";
		Query q = session.createQuery(hql);
		List list = q.list();
		transaction.commit();
		String li = list.get(0).toString();
		Integer count = Integer.parseInt(li);
		HibernateSessionFactory.closeSession();
		return count;
	}

	// ������������Ҫ�ֵ�����
	public int getTotalPages(int pageSize) throws Exception {
		int count = getConut();
		int totalpages = 0;
		totalpages = (count % pageSize == 0) ? (count / pageSize) : (count / pageSize + 1);
		return totalpages;
	}

}
