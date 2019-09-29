package com.java.demo.repository;

import com.java.demo.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface UserRepository extends CrudRepository<User, Integer> {

    Set<User> findAll();
}
