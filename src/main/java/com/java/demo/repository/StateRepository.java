package com.java.demo.repository;

import com.java.demo.entity.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface StateRepository extends CrudRepository<State, Integer> {

    Set<State> findAll();
    State findStateByStateId(Integer stateId);
}
