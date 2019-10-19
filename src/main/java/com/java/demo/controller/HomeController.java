package com.java.demo.controller;

import com.java.demo.service.StateService;
import com.java.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;

@Controller
public class HomeController {
    @Inject
    private UserService userService;

    @Inject
    private StateService stateService;

    @RequestMapping("/")
    public String home() {
        stateService.initializeStates();
        userService.initializeUsers();
        return "index.html";
    }

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}
