package com.swe.smartweatherapi.controller;

import com.swe.smartweatherapi.entity.User;
import com.swe.smartweatherapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
        user = service.authenticateUser(user);
        Map<String, Object> map = new HashMap<>();
        boolean check = user != null ? true : false;
        map.put("check", (boolean) check);
        if (check) {
            map.put("user", user);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(map);
    }

}
