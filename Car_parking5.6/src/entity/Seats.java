package entity;
// default package

import java.sql.Time;
import java.util.Date;


/**
 * Seats entity. @author MyEclipse Persistence Tools
 */

public class Seats  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private Parks parks;
     private Integer state;
     private Integer seatnum;
     private Date rentdate;
     private Date renttime;
     private Integer type;
     private String carnumber;
	 private Integer usetotal;//一个位子一天会使用多次
    // Constructors

    public String getCarnumber() {
		return carnumber;
	}

	public void setCarnumber(String carnumber) {
		this.carnumber = carnumber;
	}

	/** default constructor */
    public Seats() {
    }

	/** minimal constructor */
    public Seats(Integer id, Parks parks, Integer state, Integer type) {
        this.id = id;
        this.parks = parks;
        this.state = state;
        this.type = type;
    }
    
    /** full constructor */
    public Seats(Integer id, Parks parks, Integer state, Integer seatnum, Date rentdate, Time renttime, Integer type) {
        this.id = id;
        this.parks = parks;
        this.state = state;
        this.seatnum = seatnum;
        this.rentdate = rentdate;
        this.renttime = renttime;
        this.type = type;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public Parks getParks() {
        return this.parks;
    }
    
    public void setParks(Parks parks) {
        this.parks = parks;
    }

    public Integer getState() {
        return this.state;
    }
    
    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getSeatnum() {
        return this.seatnum;
    }
    
    public void setSeatnum(Integer seatnum) {
        this.seatnum = seatnum;
    }

    public Date getRentdate() {
        return this.rentdate;
    }
    
    public void setRentdate(Date rentdate) {
        this.rentdate = rentdate;
    }

    public Date getRenttime() {
        return this.renttime;
    }
    
    public void setRenttime(Date renttime) {
        this.renttime = renttime;
    }

    public Integer getType() {
        return this.type;
    }
    
    public void setType(Integer type) {
        this.type = type;
    }
    public Integer getUsetotal() {
		return usetotal;
	}

	public void setUsetotal(Integer usetotal) {
		this.usetotal = usetotal;
	}
}