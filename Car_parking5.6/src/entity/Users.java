package entity;
// default package



/**
 * Users entity. @author MyEclipse Persistence Tools
 */

public class Users  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String name;
     private String password;
     private String email;
     private String carnumber;


    // Constructors

    /** default constructor */
    public Users() {
    }

    
    /** full constructor */
    public Users(String name, String password, String email, String carnumber) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.carnumber = carnumber;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getCarnumber() {
        return this.carnumber;
    }
    
    public void setCarnumber(String carnumber) {
        this.carnumber = carnumber;
    }
   








}