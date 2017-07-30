package service;


import entity.Page;
import entity.Parks;
import entity.SeatInfo;

public interface ParkSeatInter {
	
	
	/*
	 *���ݵ�ǰҳ��õ���ҳչʾ��ͣ����
	 *����pageIndex:��ǰҳ��
	 *���أ�ͣ�����Ķ���List
	 * */
	public Page parksAppear(int pageIndex,int pageSize,int totalPages);
	
	/*
	 *���ͣ��������Ϣ
	 *����id:ͣ������id��
	 *���أ�ͣ�����Ķ��� 
	 * */
	public Parks queryParkRes(int id);
	
	/*
	 * ����ʣ����λ��
	 * ����id:ͣ������id��  type:��λ���࣬��ͨ���߳�� 1������ͨ   2������
	 * ���أ�����������ɹ�����ʧ��
	 * */
	public String updateRemain(int id,String type);
	
	/*
	 * seats����� 
	 * ����id:ͣ������id��  type:��λ���࣬��ͨ���߳��
	 * ���أ�����ѡ��ĳ�λ��
	 * */
	public int getSubNum(int id,String type,String carnumber);
	
	
	/*
	 * ������λ״̬ 
	 * ����id:ͣ������id��   seatnum:��ѡ��ĳ�λ��   type:��λ���࣬��ͨ���߳��
	 * ���أ���
	 * */
	public void updateSeatState(int parkid,int seatnum,String type,String carnumbe);
	
	
	/*
	 * �õ���λ������Ϣ 
	 * ����id:ͣ������id��    type:��λ���࣬��ͨ���߳��
	 * ���أ�SeatInfo����
	 * */
	public SeatInfo getSeatMes(int id,String type,String carnumbe);
	
	/*
	 * ��¼������� 
	 * ����
	 * ���أ�������
	 * */
	public int getConut() throws Exception;
	
	/*
	 * �ܹ���ҳ�� 
	 * ����count:��¼����  pageSize:ÿһҳ����
	 * ���أ���ҳ��
	 * */
	public int getTotalPages(int pageSize)throws Exception;
}
