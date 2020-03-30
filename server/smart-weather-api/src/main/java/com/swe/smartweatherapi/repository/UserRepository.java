package com.swe.smartweatherapi.repository;

import com.swe.smartweatherapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    public User save(User user);

    @Override
    User getOne(Long userId);

    @Override
    public List<User> findAll();

    @Query(value = "from User " +
            "where userName = :userName and " +
            "userPswd = :userPswd")
    public User authenticateUser(@Param(value = "userName") String userName,
                                 @Param(value = "userPswd") String userPswd);
}
