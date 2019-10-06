package com.java.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class State {

    @Id
    private Integer stateId;
    @Column
    private String abbreviation;
    @Column
    private String name;

    public State() {}

    public State(Integer stateId, String abbreviation, String name) {
        this.stateId = stateId;
        this.abbreviation = abbreviation;
        this.name = name;
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
