package com.java.demo.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class User {

    @Column
    String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
