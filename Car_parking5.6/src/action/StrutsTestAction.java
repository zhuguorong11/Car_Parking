package action;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;

import service.ParkSeatimple;
import entity.Page;
import entity.Parks;
import entity.SeatInfo;

import com.opensymphony.xwork2.ActionSupport;

public class StrutsTestAction extends ActionSupport implements ServletRequestAware,SessionAware{
	
	public HttpServletRequest request;
	public Parks park;
	public SeatInfo seatInfo;
	public Page page;
	public Map session;
	
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;	
	}
	public Page getPages() {
		return page;
	}

	public void setPages(Page pages) {
		this.page = page;
	}

	public SeatInfo getSeatInfo() {
		return seatInfo;
	}

	public void setSeatInfo(SeatInfo seatInfo) {
		this.seatInfo = seatInfo;
	}

	public Parks getPark(){
		return park;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;
	}
	
	/*处理ajax请求查询*/
	public String query() throws SQLException
	{
	  try {
		String parkid = request.getParameter("parkid");
		int id = Integer.parseInt(parkid);
		ParkSeatimple dBoperate = new ParkSeatimple();
		park = dBoperate.queryParkRes(id);
		//rrrString = dBoperate.queryRes();
	  } catch (Exception e) {
			// TODO: handle exception
		  e.printStackTrace();
	  }
		return SUCCESS;
	}
	
	public String update() throws Exception{
		String parkid = request.getParameter("parkid");
		String type = request.getParameter("type");
		String carnumber = (String) session.get("carnumber");
		int id = Integer.parseInt(parkid);
		ParkSeatimple dBoperate = new ParkSeatimple();
		seatInfo = dBoperate.getSeatMes(id, type,carnumber);
		//更新seats表
		return SUCCESS;
				}
	
	//分页操作
	public String fenYe() throws Exception{
		String pageIndexS = request.getParameter("pageIndex");//得到当前页号
		int pageIndex = Integer.parseInt(pageIndexS);
		ParkSeatimple dBoperate = new ParkSeatimple();		
		int totalPages = dBoperate.getTotalPages(6);
		page =  dBoperate.parksAppear(pageIndex, 6,totalPages);
		return SUCCESS;
	}


}