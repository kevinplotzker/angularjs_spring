package com.java.demo.service;

import com.java.demo.dto.UserDto;
import com.java.demo.exception.UserEmailExistsException;
import com.java.demo.exception.UserNotFoundException;

import java.util.Set;

public interface UserService {

    void initializeUsers();
    void submitUser(UserDto userDto) throws UserEmailExistsException;
    Set<UserDto> getUsers();
    UserDto getUserById(Integer userId) throws UserNotFoundException;
    void deleteUser(Integer userId);
}
