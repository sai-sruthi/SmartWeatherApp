package com.swe.smartweatherapi.service;

import com.swe.smartweatherapi.entity.User;
import com.swe.smartweatherapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Boolean authenticateUser(User user) {
        try {
            if (repository.authenticateUser(user.getUserName(),
                    user.getUserPswd()) != null) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            // TODO: handle this later
            return null;
        }
    }

}
