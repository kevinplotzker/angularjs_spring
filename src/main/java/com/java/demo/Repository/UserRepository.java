package com.java.demo.Repository;

import com.java.demo.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface UserRepository extends CrudRepository<User, Integer> {

    Set<User> findAll();
}
