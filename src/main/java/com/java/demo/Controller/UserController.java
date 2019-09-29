package com.java.demo.Controller;

import com.java.demo.DTO.UserDto;
import com.java.demo.Service.UserService;
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

    @PostMapping(value = "/user")
    private ResponseEntity<?> getUsers(@RequestBody UserDto dto) {
        try {
            userService.submitUser(dto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
