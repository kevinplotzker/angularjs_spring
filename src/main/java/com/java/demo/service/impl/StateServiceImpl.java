package com.java.demo.service.impl;

import com.java.demo.dto.StateDto;
import com.java.demo.entity.State;
import com.java.demo.repository.StateRepository;
import com.java.demo.service.StateService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashSet;
import java.util.Set;

@Service
public class StateServiceImpl implements StateService {

    @Inject
    private StateRepository stateRepository;

    @Override
    public Set<StateDto> getStates() {
        return map(stateRepository.findAll());
    }

    @Override
    public void initializeStates() {
        State state1 = new State(1, "CA", "California");
        State state2 = new State(2, "WA", "Washington");
        State state3 = new State(3, "OR", "Oregon");
        stateRepository.save(state1);
        stateRepository.save(state2);
        stateRepository.save(state3);

    }

    private Set<StateDto> map(Set<State> states) {
        Set<StateDto> stateDtos = new HashSet<>();
        for (State s : states) {
            StateDto dto = new StateDto();
            dto.setStateId(s.getStateId());
            dto.setAbbreviation(s.getAbbreviation());
            dto.setName(s.getName());
            stateDtos.add(dto);
        }
        return stateDtos;
    }
}
