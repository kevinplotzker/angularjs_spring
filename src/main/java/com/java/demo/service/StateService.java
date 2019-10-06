package com.java.demo.service;


import com.java.demo.dto.StateDto;

import java.util.Set;

public interface StateService {

    Set<StateDto> getStates();
    void initializeStates();
}
