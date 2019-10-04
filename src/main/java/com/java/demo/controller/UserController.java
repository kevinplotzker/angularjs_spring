package com.java.demo.controller;

import com.java.demo.dto.UserDto;
import com.java.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Set;

@RestController
@RequestMapping(value = "/v1")
public class UserController {

    @Inject
    private UserService userService;

    @GetMapping(value = "/users")
    private ResponseEntity<?> getUsers() {
        try {
            Set<UserDto> dtos = userService.getUsers();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/user/{userId}")
    private ResponseEntity<?> deleteUser(@PathVariable Integer userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/user/{userId}")
    private ResponseEntity<?> getUserById(@PathVariable Integer userId) {
        try {
            UserDto dto = userService.getUserById(userId);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            if (e.getLocalizedMessage().equals("No user with this id exists.")) {
                status = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(status);
        }
    }

    @PostMapping(value = "/user")
    private ResponseEntity<?> submitUser(@RequestBody UserDto dto) {
        try {
            userService.submitUser(dto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
