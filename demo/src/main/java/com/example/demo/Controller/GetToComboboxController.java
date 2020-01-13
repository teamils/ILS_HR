package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.*;
import com.example.demo.Repository.*;
import com.example.demo.Repository.ComboboxRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class GetToComboboxController {
    @Autowired private DepartmentRepository departmentRepository;
    @Autowired private RoleStatusRepository roleStatusRepository;
    @Autowired private BankRepository bankRepository;
    @Autowired private PositionRepository positionRepository;
    @Autowired private LeavesRepository leavesRepository;
    @Autowired private LeaveTypeForAlldayRepository leaveTypeForAlldayRepository;
    @Autowired private PrefixRepository prefixRepository;
    @Autowired private GenderRepository genderRepository;
    @Autowired private EmployeeTypeRepository employeeTypeRepository;
    @Autowired private EducationRepository educationRepository;
    @Autowired private EmpStatusRepository empStatusRepository;

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


    @GetMapping(path = "/leaveTypeForAlldays")
    public Iterable<LeaveTypeForAllday> leaveTypeForAlldays() {
        return leaveTypeForAlldayRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/prefix")
    public Iterable<Prefix> prefix() {
        return prefixRepository.findAll().stream().collect(Collectors.toList());
    }
    @GetMapping(path = "/gender")
    public Iterable<Gender> gender() {
        return genderRepository.findAll().stream().collect(Collectors.toList());
    }
    @GetMapping(path = "/employeeType")
    public Iterable<EmployeeType> employeeType() {
        return employeeTypeRepository.findAll().stream().collect(Collectors.toList());
    }
    @GetMapping(path = "/education")
    public Iterable<Education> education() {
        return educationRepository.findAll().stream().collect(Collectors.toList());
    }
    @GetMapping(path = "/empStatus")
    public Iterable<EmpStatus> empStatus() {
        return empStatusRepository.findAll().stream().collect(Collectors.toList());
    }

    @PostMapping(path = "/insertBank/{bankName}")
    public Bank insertBank(@PathVariable String bankName) {
       Bank bank = new Bank();
       bank.setBankName(bankName);
       bankRepository.save(bank);
       return null;
    }
    @DeleteMapping("/deleteBank/{bankID}")
    public Bank deleteBank(@PathVariable long bankID) {
        Bank bank = bankRepository.findById(bankID).get();
        bankRepository.delete(bank);
        return null;
    }

    @PostMapping(path = "/insertDepartment/{departmentInput}")
    public Department insertDepartment(@PathVariable String departmentInput) {
        Department insertDepartment = new Department();
        insertDepartment.setDepartmentName(departmentInput);
        departmentRepository.save(insertDepartment);
        return null;
    }
    @DeleteMapping("/deleteDepartment/{departmentID}")
    public Department deleteDepartment(@PathVariable long departmentID) {
        Department department = departmentRepository.findById(departmentID).get();
        departmentRepository.delete(department);
        return null;
    }

}
