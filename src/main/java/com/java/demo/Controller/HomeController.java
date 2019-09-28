package com.java.demo.Controller;

import com.java.demo.Entity.User;
import com.java.demo.Service.UserService;
import org.hibernate.service.spi.InjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashSet;
import java.util.Set;

@Controller
public class HomeController {

    @Inject
    private UserService userService;

    @RequestMapping("/")
    public String home() {
        return "view/index.html";
    }

    @GetMapping(value = "/users")
    public ResponseEntity<> getUsers() {
        Set<User> userSet = new HashSet<>();

        return new ResponseEntity(userSet, HttpStatus.OK);
    }

}
