package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.*;
import com.example.demo.Entity.MasterAttendance;
import com.example.demo.Repository.*;
import com.example.demo.Repository.ComboboxRepository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    @Autowired private MasterAttendanceRepository masterAttendanceRepository;

    /*@GetMapping(path = "/department")
    public Iterable<Department> departments() {
        return departmentRepository.findAll().stream().collect(Collectors.toList());
    }*/

    @GetMapping(path = "/department")
    public Iterable<Department> departments() {
        return this.departmentRepository.getDepartmentOrderByName();
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
    @GetMapping(path = "/masterAttendances")
    public Iterable<MasterAttendance> masterAttendances() {
        return masterAttendanceRepository.findAll().stream().collect(Collectors.toList());
    }

    @PostMapping(path = "/insertBank/{bankName}/{name}")
    public Bank insertBank(@PathVariable String bankName,@PathVariable String name) {
       Bank bank = new Bank();
       bank.setBankName(bankName);
       bank.setCreate_date(new Date());
       bank.setCreate_by(name);
       bankRepository.save(bank);
       return null;
    }
    @DeleteMapping("/deleteBank/{bankID}")
    public Bank deleteBank(@PathVariable long bankID) {
        Bank bank = bankRepository.findById(bankID).get();
        bankRepository.delete(bank);
        return null;
    }


    @PostMapping(path = "/insertDepartment/{departmentInput}/{name}")
    public Department insertDepartment(@PathVariable String departmentInput,@PathVariable String name) {
        Department insertDepartment = new Department();
        insertDepartment.setDepartmentName(departmentInput);
        insertDepartment.setCreate_date(new Date());
        insertDepartment.setCreate_by(name);
        departmentRepository.save(insertDepartment);
        return null;
    }
    @DeleteMapping("/deleteDepartment/{departmentID}")
    public Department deleteDepartment(@PathVariable long departmentID) {
        Department department = departmentRepository.findById(departmentID).get();
        departmentRepository.delete(department);
        return null;
    }


    @PostMapping(path = "/insertPosition/{positionInput}/{name}")
    public Position insertPosition(@PathVariable String positionInput,@PathVariable String name) {
        Position insertPosition = new Position();
        insertPosition.setPositionName(positionInput);
        insertPosition.setCreate_date(new Date());
        insertPosition.setCreate_by(name);
        positionRepository.save(insertPosition);
        return null;
    }
    @DeleteMapping("/deletePosition/{positionID}")
    public Position deletePosition(@PathVariable long positionID) {
        Position deletePosition = positionRepository.findById(positionID).get();
        positionRepository.delete(deletePosition);
        return null;
    }


    @PostMapping(path = "/inserteducation/{educationInput}/{name}")
    public Education inserteducation(@PathVariable String educationInput,@PathVariable String name) {
        Education inserteducation = new Education();
        inserteducation.setEducationName(educationInput);
        inserteducation.setCreate_date(new Date());
        inserteducation.setCreate_by(name);
        educationRepository.save(inserteducation);
        return null;
    }
    @DeleteMapping("/deleteeducation/{educationID}")
    public Education deleteeducation(@PathVariable long educationID) {
        Education deleteeducation = educationRepository.findById(educationID).get();
        educationRepository.delete(deleteeducation);
        return null;
    }


    @PostMapping(path = "/insertEmployeeType/{employeeTypeInput}/{name}")
    public EmployeeType insertEmployeeType(@PathVariable String employeeTypeInput,@PathVariable String name) {
        EmployeeType insertEmployeeType = new EmployeeType();
        insertEmployeeType.setEmployeeTypeName(employeeTypeInput);
        insertEmployeeType.setCreate_date(new Date());
        insertEmployeeType.setCreate_by(name);
        employeeTypeRepository.save(insertEmployeeType);
        return null;
    }
    @DeleteMapping("/deleteEmployeeType/{employeeTypeID}")
    public EmployeeType deleteEmployeeType(@PathVariable long employeeTypeID) {
        EmployeeType deleteEmployeeType = employeeTypeRepository.findById(employeeTypeID).get();
        employeeTypeRepository.delete(deleteEmployeeType);
        return null;
    }


    @PostMapping(path = "/insertEmpStatus/{EmpStatusInput}/{name}")
    public EmpStatus insertEmpStatus(@PathVariable String EmpStatusInput,@PathVariable String name) {
        EmpStatus insertEmpStatus = new EmpStatus();
        insertEmpStatus.setEmpStatusName(EmpStatusInput);
        insertEmpStatus.setCreate_date(new Date());
        insertEmpStatus.setCreate_by(name);
        empStatusRepository.save(insertEmpStatus);
        return null;
    }
    @DeleteMapping("/deleteEmpStatus/{empStatusID}")
    public EmpStatus deleteEmpStatus(@PathVariable long empStatusID) {
        EmpStatus empStatus = empStatusRepository.findById(empStatusID).get();
        empStatusRepository.delete(empStatus);
        return null;
    }


    @PostMapping(path = "/insertGender/{genderInput}/{name}")
    public Gender insertGender(@PathVariable String genderInput,@PathVariable String name) {
        Gender insertGender = new Gender();
        insertGender.setGenderName(genderInput);
        insertGender.setCreate_date(new Date());
        insertGender.setCreate_by(name);
        genderRepository.save(insertGender);
        return null;
    }
    @DeleteMapping("/deleteGender/{genderID}")
    public Gender deleteGender(@PathVariable long genderID) {
        Gender deleteGender = genderRepository.findById(genderID).get();
        genderRepository.delete(deleteGender);
        return null;
    }


    @PostMapping(path = "/insertPrefix/{prefixInput}/{name}")
    public Prefix insertPrefix(@PathVariable String prefixInput,@PathVariable String name) {
        Prefix insertPrefix = new Prefix();
        insertPrefix.setPrefixName(prefixInput);
        insertPrefix.setCreate_date(new Date());
        insertPrefix.setCreate_by(name);
        prefixRepository.save(insertPrefix);
        return null;
    }
    @DeleteMapping("/deletePrefix//{prefixID}")
    public Prefix deletePrefix(@PathVariable long prefixID) {
        Prefix deletePrefix = prefixRepository.findById(prefixID).get();
        prefixRepository.delete(deletePrefix);
        return null;
    }


    @PostMapping(path = "/insertMasterAttendance/{masterAttendance_year}/{masterAttendance_leaveDay}/{name}")
    public MasterAttendance insertMasterAttendance(@PathVariable int masterAttendance_year,@PathVariable int masterAttendance_leaveDay,@PathVariable String name) {
        MasterAttendance insertMasterAttendance = new MasterAttendance();
        insertMasterAttendance.setYear(masterAttendance_year);
        insertMasterAttendance.setDayLeave(masterAttendance_leaveDay);
        insertMasterAttendance.setCreate_date(new Date());
        insertMasterAttendance.setCreate_by(name);
        masterAttendanceRepository.save(insertMasterAttendance);
        return insertMasterAttendance;
    }
    @DeleteMapping("/deleteMasterAttendance/{masterAttendanceID}")
    public MasterAttendance deleteMasterAttendance(@PathVariable long masterAttendanceID) {
        MasterAttendance deleteMasterAttendance = masterAttendanceRepository.findById(masterAttendanceID).get();
        masterAttendanceRepository.delete(deleteMasterAttendance);
        return null;
    }
    @PostMapping(path = "/editmasterAttendance/{masterAttendanceID}/{dayLeave}/{name}")
    public MasterAttendance editmasterAttendance(@PathVariable long masterAttendanceID,@PathVariable int dayLeave,@PathVariable String name) {
        MasterAttendance editmasterAttendance = masterAttendanceRepository.findById(masterAttendanceID).get();
        editmasterAttendance.setDayLeave(dayLeave);
        editmasterAttendance.setUpdate_date(new Date());
        editmasterAttendance.setUpdate_by(name);
        masterAttendanceRepository.save(editmasterAttendance);
        return editmasterAttendance;
    }



}
