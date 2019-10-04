package com.java.demo.service.impl;

import com.java.demo.dto.UserDto;
import com.java.demo.entity.User;
import com.java.demo.exception.ResourceNotFoundException;
import com.java.demo.repository.UserRepository;
import com.java.demo.service.UserService;
import org.springframework.stereotype.Service;
import sun.nio.ch.SelectorImpl;

import javax.inject.Inject;
import java.text.SimpleDateFormat;
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
    public UserDto getUserById(Integer userId) {
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new ResourceNotFoundException("No user with this id exists.");
        } else {
            return map(user);
        }
    }

    @Override
    public void submitUser(UserDto dto) {
        userRepository.save(map(dto));
    }

    @Override
    public void deleteUser(Integer userId) {
        User user = userRepository.findOne(userId);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    private UserDto map(User u) {
        UserDto dto = new UserDto();
        dto.setUserId(u.getUserId());
        dto.setFirstName(u.getFirstName());
        dto.setLastName(u.getLastName());
        dto.setEmailAddress(u.getEmailAddress());
        dto.setStreetAddress(u.getStreetAddress());
        dto.setCity(u.getCity());
        dto.setZipCode(u.getZipCode());
        dto.setBirthDate(u.getBirthDate());
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/YYYY");
        dto.setBirthDateString(sdf.format(u.getBirthDate()));
        return dto;
    }

    private User map(UserDto dto) {
        User user = new User();
        user.setUserId(dto.getUserId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setStreetAddress(dto.getStreetAddress());
        user.setCity(dto.getCity());
        user.setZipCode(dto.getZipCode());
        user.setEmailAddress(dto.getEmailAddress());
        user.setBirthDate(dto.getBirthDate());
        return user;
    }

    private Set<UserDto> map(Set<User> users) {
        Set<UserDto> dtos = new HashSet<>();
        for (User u : users) {
            dtos.add(map(u));
        }
        return dtos;
    }

}
