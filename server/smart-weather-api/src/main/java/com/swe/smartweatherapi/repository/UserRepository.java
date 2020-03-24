package com.swe.smartweatherapi.repository;

import com.swe.smartweatherapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    public User save(User user);

    @Query(value = "from User " +
            "where userName = :userName and " +
            "userPswd = :userPswd")
    public User authenticateUser(@Param(value = "userName") String userName,
                                 @Param(value = "userPswd") String userPswd);
}
