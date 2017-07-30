package service;


import entity.Page;
import entity.Parks;
import entity.SeatInfo;

public interface ParkSeatInter {
	
	
	/*
	 *根据当前页面得到该页展示的停车场
	 *参数pageIndex:当前页号
	 *返回：停车场的对象List
	 * */
	public Page parksAppear(int pageIndex,int pageSize,int totalPages);
	
	/*
	 *获得停车场的信息
	 *参数id:停车场的id号
	 *返回：停车场的对象 
	 * */
	public Parks queryParkRes(int id);
	
	/*
	 * 更新剩余座位数
	 * 参数id:停车场的id号  type:车位种类，普通或者充电 1代表普通   2代表充电
	 * 返回：更新情况，成功或者失败
	 * */
	public String updateRemain(int id,String type);
	
	/*
	 * seats表更新 
	 * 参数id:停车场的id号  type:车位种类，普通或者充电
	 * 返回：返回选择的车位号
	 * */
	public int getSubNum(int id,String type,String carnumber);
	
	
	/*
	 * 更新座位状态 
	 * 参数id:停车场的id号   seatnum:所选择的车位号   type:车位种类，普通或者充电
	 * 返回：无
	 * */
	public void updateSeatState(int parkid,int seatnum,String type,String carnumbe);
	
	
	/*
	 * 得到座位更新信息 
	 * 参数id:停车场的id号    type:车位种类，普通或者充电
	 * 返回：SeatInfo对象
	 * */
	public SeatInfo getSeatMes(int id,String type,String carnumbe);
	
	/*
	 * 记录总体奥数 
	 * 参数
	 * 返回：总条数
	 * */
	public int getConut() throws Exception;
	
	/*
	 * 总共的页数 
	 * 参数count:记录总数  pageSize:每一页条数
	 * 返回：总页数
	 * */
	public int getTotalPages(int pageSize)throws Exception;
}
