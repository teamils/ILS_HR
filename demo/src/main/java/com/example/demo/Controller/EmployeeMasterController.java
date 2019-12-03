package com.example.demo.Controller;

import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeMasterController {


    @Autowired private EmployeeMasterRepository employeeMasterRepository;


    @GetMapping(path = "ILS_HR/employee")
    public Collection<EmployeeMaster> employeeMaster() {
        return employeeMasterRepository.findAll().stream().collect(Collectors.toList());
    }


    @PostMapping("/ILS_HR/{employeeMasterCustomerCode}/{prefixSelect}/{employeeMasterFirstName}/{employeeMasterLastName}/{employeeMasterNickName}" +
            "/{employeeMasterGender}/{maritalStatus}/{employeeMasterBirthDate}/{employeeMasterPersonID}/{employeeMasterTel1}/{empEmail}" +
            "/{empAddressReal}/{empAddressPerson}/{employeeMasterStartDate}/{employeePosition}/{employeeDepartment}/{employeeType}/{education}/{bank}/{bankNumber}")
    public EmployeeMaster employeeMaster(@PathVariable String employeeMasterCustomerCode , @PathVariable String prefixSelect ,@PathVariable String employeeMasterFirstName
            , @PathVariable String employeeMasterLastName , @PathVariable String employeeMasterNickName , @PathVariable String employeeMasterGender
            , @PathVariable String maritalStatus , @PathVariable Date employeeMasterBirthDate , @PathVariable String employeeMasterPersonID
            , @PathVariable String employeeMasterTel1, @PathVariable String empEmail , @PathVariable String empAddressReal
            , @PathVariable String empAddressPerson , @PathVariable Date employeeMasterStartDate , @PathVariable String employeePosition
            , @PathVariable String employeeDepartment , @PathVariable String employeeType , @PathVariable String education
            , @PathVariable String bank , @PathVariable String bankNumber ){

        EmployeeMaster employeeMaster1 = new EmployeeMaster();
        employeeMaster1.setEmployeeMasterCustomerCode(employeeMasterCustomerCode);
        employeeMaster1.setPrefix(prefixSelect);
        employeeMaster1.setEmployeeMasterFirstName(employeeMasterFirstName);
        employeeMaster1.setEmployeeMasterLastName(employeeMasterLastName);
        employeeMaster1.setEmployeeMasterNickName(employeeMasterNickName);
        employeeMaster1.setEmployeeMasterGender(employeeMasterGender);
        employeeMaster1.setMaritalStatus(maritalStatus);
        employeeMaster1.setEmployeeMasterBirthDate(employeeMasterBirthDate);
        employeeMaster1.setEmployeeMasterPersonID(employeeMasterPersonID);
        employeeMaster1.setEmployeeMasterTel1(employeeMasterTel1);
        employeeMaster1.setEmpEmail(empEmail);
        employeeMaster1.setEmpAddressReal(empAddressReal);
        employeeMaster1.setEmpAddressPerson(empAddressPerson);
        employeeMaster1.setEmployeeMasterStartDate(employeeMasterStartDate);
        employeeMaster1.setEmployeePosition(employeePosition);
        employeeMaster1.setEmployeeDepartment(employeeDepartment);
        employeeMaster1.setEmployeeType(employeeType);
        employeeMaster1.setEducation(education);
        employeeMaster1.setBank(bank);
        employeeMaster1.setBankNumber(bankNumber);

        employeeMaster1.setIsActive("1");
        employeeMasterRepository.save(employeeMaster1);
        return employeeMaster1;

    }


   /* @PostMapping(path = "/editemployee/{NewemployeeMasterCustomerCode}/{Newprefix}/{NewemployeeMasterFirstName}" +
            "/{NewemployeeMasterLastName}/{NewemployeeMasterNickName}/{NewemployeeMasterGender}/{NewmaritalStatus}" +
            "/{NewemployeeMasterBirthDate}/{NewemployeeMasterPersonID}/{NewemployeeMasterTel1}/{NewempEmail}/{NewempAddressReal}" +
            "/{NewempAddressPerson}/{NewemployeeMasterStartDate}/{NewemployeePosition}/{NewemployeeDepartment}/{NewemployeeType}" +
            "/{Neweducation}/{Newbank}/{NewbankNumber}/{NewIsActive}")
    public EmployeeMaster employeeMaster(@PathVariable String firstname, @PathVariable String lastname, @PathVariable String department, @PathVariable String position,
                          @PathVariable String username,@PathVariable String password,@PathVariable String status) {

        Users users = usersRepository.findByUsernameAndIsActive(username,"1");
        users.setFirstname(firstname);
        users.setStatus(status);
        users.setPassword(password);
        users.setPosition(position);
        users.setLastname(lastname);
        users.setDepartment(department);
        usersRepository.save(users);
        return users;
    }*/

}