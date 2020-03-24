package com.swe.smartweatherapi.entity;

import javax.persistence.*;

@Entity
@Table(name = "table_user")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_pswd")
    private String userPswd;
    @Column(name = "updates")
    private Boolean updates;
    @Column(name = "isBusinessUser")
    private Boolean isBusinessUser;
    @Column(name = "latitude")
    private String latitude;
    @Column(name = "longitude")
    private String longitude;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPswd() {
        return userPswd;
    }

    public void setUserPswd(String userPswd) {
        this.userPswd = userPswd;
    }

    public Boolean getUpdates() {
        return updates;
    }

    public void setUpdates(Boolean updates) {
        this.updates = updates;
    }

    public Boolean getBusinessUser() {
        return isBusinessUser;
    }

    public void setBusinessUser(Boolean businessUser) {
        isBusinessUser = businessUser;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("User{");
        sb.append("userId=").append(userId);
        sb.append(", userName='").append(userName).append('\'');
        sb.append(", userPswd='").append(userPswd).append('\'');
        sb.append(", updates=").append(updates);
        sb.append(", isBusinessUser=").append(isBusinessUser);
        sb.append(", latitude='").append(latitude).append('\'');
        sb.append(", longitude='").append(longitude).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
