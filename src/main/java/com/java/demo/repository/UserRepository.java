package com.java.demo.repository;

import com.java.demo.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface UserRepository extends CrudRepository<User, Integer> {

    Set<User> findAll();
    @Query("select u from User u where u.userId = :userId")
    User findOne(@Param("userId") Integer userId);
}
