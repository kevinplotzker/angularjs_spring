package com.java.demo.service.impl;

import com.java.demo.dto.StateDto;
import com.java.demo.dto.UserDto;
import com.java.demo.entity.State;
import com.java.demo.entity.User;
import com.java.demo.exception.UserEmailExistsException;
import com.java.demo.exception.UserNotFoundException;
import com.java.demo.repository.StateRepository;
import com.java.demo.repository.UserRepository;
import com.java.demo.service.UserService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Inject
    private UserRepository userRepository;

    @Inject
    private StateRepository stateRepository;

    @Override
    public Set<UserDto> getUsers() {
        return map(userRepository.findAll());
    }

    @Override
    public UserDto getUserById(Integer userId) throws UserNotFoundException {
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw UserNotFoundException.createWith(userId);
        } else {
            return map(user);
        }
    }

    @Override
    public void submitUser(UserDto dto) throws UserEmailExistsException {
       if (emailAddressExists(dto)) {
            throw UserEmailExistsException.createWith(dto.getEmailAddress());
        } else {
            userRepository.save(map(dto));
        }
    }

    private Boolean emailAddressExists(UserDto dto) {
        Boolean found = false;
        User existingEmailUser = userRepository.findByEmailAddress(dto.getEmailAddress());
        if (existingEmailUser != null) {
            if (dto.getUserId() == null) {
                found = true;
            } else if (dto.getUserId().intValue() != existingEmailUser.getUserId().intValue()) {
                found = true;
            }
        }
        return found;
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
        dto.setStateDto(new StateDto(u.getState().getStateId(), u.getState().getName()));
        dto.setZipCode(u.getZipCode());
        dto.setBirthDate(u.getBirthDate());
        return dto;
    }

    private User map(UserDto dto) {
        User user = new User();
        user.setUserId(dto.getUserId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setStreetAddress(dto.getStreetAddress());
        user.setCity(dto.getCity());
        user.setState(stateRepository.findStateByStateId(dto.getStateDto().getStateId()));
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

    @Override
    public void initializeUsers() {
        User user1 = new User();
        user1.setUserId(1);
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setEmailAddress("j.doe@example.com");
        user1.setStreetAddress("123 Main Street");
        user1.setZipCode("12345");
        user1.setCity("Anytown");
        user1.setState(stateRepository.findStateByStateId(1));
        user1.setBirthDate(LocalDate.now().minusDays(365));
        userRepository.save(user1);
        User user2 = new User();
        user2.setUserId(2);
        user2.setFirstName("Jane");
        user2.setLastName("Doe");
        user2.setEmailAddress("jane.doe@example.com");
        user2.setStreetAddress("124 Main Street");
        user2.setZipCode("12345");
        user2.setState(stateRepository.findStateByStateId(1));
        user2.setCity("Anytown");
        user2.setBirthDate(LocalDate.now().minusDays(725));
        userRepository.save(user2);
    }
}
