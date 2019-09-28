package com.java.demo.Service.impl;

import com.java.demo.DTO.UserDto;
import com.java.demo.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public Set<UserDto> getUsers() {
        Set<UserDto> dtos = new HashSet<>();


        return dtos;
    }
}
