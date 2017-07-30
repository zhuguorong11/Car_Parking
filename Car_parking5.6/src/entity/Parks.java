package entity;
// default package

import java.util.HashSet;
import java.util.Set;


/**
 * Parks entity. @author MyEclipse Persistence Tools
 */

public class Parks  implements java.io.Serializable {


    // Fields    

     private Integer parkid;
     private Integer type;
     private Integer total;
     private Integer remain;
     private Float norprice;
     private Integer totalelec;
     private Integer remainelec;
     private Float priceelec;
     private Double longitude;
     private Double latitude;
     private String parkname;
     private String address;
     private Set seatses = new HashSet(0);


    // Constructors

    /** default constructor */
    public Parks() {
    }

	/** minimal constructor */
    public Parks(Integer type, Integer total, Integer remain, Float norprice, Integer totalelec, Integer remainelec, Float priceelec, Double longitude, Double latitude) {
        this.type = type;
        this.total = total;
        this.remain = remain;
        this.norprice = norprice;
        this.totalelec = totalelec;
        this.remainelec = remainelec;
        this.priceelec = priceelec;
        this.longitude = longitude;
        this.latitude = latitude;
    }
    
    /** full constructor */
    public Parks(Integer type, Integer total, Integer remain, Float norprice, Integer totalelec, Integer remainelec, Float priceelec, Double longitude, Double latitude, String parkname, String address, Set seatses) {
        this.type = type;
        this.total = total;
        this.remain = remain;
        this.norprice = norprice;
        this.totalelec = totalelec;
        this.remainelec = remainelec;
        this.priceelec = priceelec;
        this.longitude = longitude;
        this.latitude = latitude;
        this.parkname = parkname;
        this.address = address;
        this.seatses = seatses;
    }

   
    // Property accessors

    public Integer getParkid() {
        return this.parkid;
    }
    
    public void setParkid(Integer parkid) {
        this.parkid = parkid;
    }

    public Integer getType() {
        return this.type;
    }
    
    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getTotal() {
        return this.total;
    }
    
    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getRemain() {
        return this.remain;
    }
    
    public void setRemain(Integer remain) {
        this.remain = remain;
    }

    public Float getNorprice() {
        return this.norprice;
    }
    
    public void setNorprice(Float norprice) {
        this.norprice = norprice;
    }

    public Integer getTotalelec() {
        return this.totalelec;
    }
    
    public void setTotalelec(Integer totalelec) {
        this.totalelec = totalelec;
    }

    public Integer getRemainelec() {
        return this.remainelec;
    }
    
    public void setRemainelec(Integer remainelec) {
        this.remainelec = remainelec;
    }

    public Float getPriceelec() {
        return this.priceelec;
    }
    
    public void setPriceelec(Float priceelec) {
        this.priceelec = priceelec;
    }

    public Double getLongitude() {
        return this.longitude;
    }
    
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return this.latitude;
    }
    
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getParkname() {
        return this.parkname;
    }
    
    public void setParkname(String parkname) {
        this.parkname = parkname;
    }

    public String getAddress() {
        return this.address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    public Set getSeatses() {
        return this.seatses;
    }
    
    public void setSeatses(Set seatses) {
        this.seatses = seatses;
    }
   








}