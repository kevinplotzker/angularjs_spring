package com.java.demo.controller;

import com.java.demo.dto.UserDto;
import com.java.demo.exception.ApiError;
import com.java.demo.exception.GlobalExceptionHandler;
import com.java.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.inject.Inject;
import java.util.Set;

@RestController
@RequestMapping(value = "/v1")
public class UserController {

    @Inject
    private UserService userService;

    @GetMapping(value = "/users")
    private ResponseEntity<?> getUsers(WebRequest request) {
        try {
            Set<UserDto> dtos = userService.getUsers();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return handleException(e, request);
        }
    }

    @DeleteMapping(value = "/user/{userId}")
    private ResponseEntity<?> deleteUser(WebRequest request, @PathVariable Integer userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return handleException(e, request);
        }
    }

    @GetMapping(value = "/user/{userId}")
    private ResponseEntity<?> getUserById(WebRequest request, @PathVariable Integer userId) {
        try {
            UserDto dto = userService.getUserById(userId);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            return handleException(e, request);
        }
    }

    @PostMapping(value = "/user")
    private ResponseEntity<?> submitUser(WebRequest request, @RequestBody UserDto dto) {
        try {
            userService.submitUser(dto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return handleException(e, request);
        }
    }

    private ResponseEntity<ApiError> handleException(Exception e, WebRequest request) {
        GlobalExceptionHandler gle = new GlobalExceptionHandler();
        return gle.handleException(e, request);
    }
}
