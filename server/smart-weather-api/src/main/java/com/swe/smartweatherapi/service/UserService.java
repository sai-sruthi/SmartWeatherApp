package com.swe.smartweatherapi.service;

import com.swe.smartweatherapi.entity.User;
import com.swe.smartweatherapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User save(User user) {
        try {
            return repository.save(user);
        } catch (Exception ex) {
            // TODO: handle this later
            return null;
        }
    }

    public User getOne(Long userId) {
        try {
            return repository.getOne(userId);
        } catch (Exception ex) {
            // TODO: handle this later
            return null;
        }
    }

    public List<User> findAll() {
        try {
            return repository.findAll();
        } catch (Exception ex) {
            // TODO: handle this later
            return null;
        }
    }

    public User authenticateUser(User user) {
        try {
            return repository.authenticateUser(user.getUserName(),
                    user.getUserPswd());
        } catch (Exception ex) {
            // TODO: handle this later
            return null;
        }
    }

}
