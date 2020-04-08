package com.swe.smartweatherapi.controller;

import com.swe.smartweatherapi.entity.User;
import com.swe.smartweatherapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/users")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @RequestMapping(
            value = "/",
            method = RequestMethod.POST)
    public ResponseEntity save(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.save(user));
    }

    @RequestMapping(
            value = "/authenticate/",
            method = RequestMethod.POST
    )
    public ResponseEntity authenticateUser(@RequestBody User user) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.authenticateUser(user));
    }

}
