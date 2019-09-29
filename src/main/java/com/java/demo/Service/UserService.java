package com.java.demo.Service;

import com.java.demo.DTO.UserDto;

import java.util.Set;

public interface UserService {

    void submitUser(UserDto userDto);

    Set<UserDto> getUsers();
}
