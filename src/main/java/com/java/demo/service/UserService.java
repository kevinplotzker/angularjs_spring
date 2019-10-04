package com.java.demo.service;

import com.java.demo.dto.UserDto;

import java.util.Set;

public interface UserService {

    void submitUser(UserDto userDto);
    Set<UserDto> getUsers();
    UserDto getUserById(Integer userId);
    void deleteUser(Integer userId);
}
