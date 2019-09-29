package com.java.demo.Service.impl;

import com.java.demo.DTO.UserDto;
import com.java.demo.Entity.User;
import com.java.demo.Repository.UserRepository;
import com.java.demo.Service.UserService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Inject
    private UserRepository userRepository;

    @Override
    public Set<UserDto> getUsers() {
        return map(userRepository.findAll());
    }

    @Override
    public void submitUser(UserDto dto) {
        User user = new User();
        user.setUserName(dto.getUserName());
        userRepository.save(user);
    }

    private Set<UserDto> map(Set<User> users) {
        Set<UserDto> dtos = new HashSet<>();
        for (User u : users) {
            UserDto dto = new UserDto();
            dto.setUserName(u.getUserName());
            dto.setUserId(u.getUserId());
            dtos.add(dto);
        }
        return dtos;
    }

}
