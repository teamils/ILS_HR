package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class GetToComboboxController {
    @Autowired private DepartmentRepository departmentRepository;
    @Autowired private RoleStatusRepository roleStatusRepository;
    @Autowired private BankRepository bankRepository;
    @Autowired private PositionRepository positionRepository;
    @Autowired private LeaveTypeRepository leaveTypeRepository;
    @Autowired private LeavesRepository leavesRepository;

    @GetMapping(path = "/department")
    public Iterable<Department> departments() {
        return departmentRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/roleStatus")
    public Iterable<RoleStatus> roleStatuses() {
        return roleStatusRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/bank")
    public Iterable<Bank> banks() {
        return bankRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/position")
    public Iterable<Position> positions() {
        return positionRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/leaveType")
    public Iterable<LeaveType> leaveTypes() {
        return leaveTypeRepository.findAll().stream().collect(Collectors.toList());
    }


}
