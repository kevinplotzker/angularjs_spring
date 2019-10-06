package com.java.demo.controller;

import com.java.demo.dto.StateDto;
import com.java.demo.service.StateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "/v1")
public class StateController {

    @Inject
    private StateService stateService;

    @GetMapping(value = "/states")
    private ResponseEntity<?> getStates() {
        Set<StateDto> dtos = new HashSet<>();
        try {
            dtos = stateService.getStates();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(dtos, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
