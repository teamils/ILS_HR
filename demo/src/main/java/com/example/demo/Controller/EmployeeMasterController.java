package com.example.demo.Controller;

import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeMasterController {


    @Autowired
    private EmployeeMasterRepository employeeMasterRepository;

    @GetMapping(path = "ILS_HR/employee")
    public Collection<EmployeeMaster> employeeMaster() {
        return employeeMasterRepository.findAll().stream().filter(this::Active).collect(Collectors.toList());
    }

    private boolean Active(EmployeeMaster employeeMaster) {
        return employeeMaster.getIsActive().equals("1");
    }

    @GetMapping(path = "/SearchEmployeeForAttendance/{employeeMasterCustomerCode}") //SearchEmployeeForAttendance
    public EmployeeMaster employeeMaster(@PathVariable String employeeMasterCustomerCode) {
        //System.out.println("employeeMasterCustomerCode = "+employeeMasterCustomerCode);
        EmployeeMaster employeeMaster = employeeMasterRepository.findByemployeeMasterCustomerCode(employeeMasterCustomerCode);
        return employeeMaster;
    }

    @PostMapping("/ILS_HR/{employeeMasterCustomerCode}/{prefixSelect}/{employeeMasterFirstName}/{employeeMasterLastName}/{employeeMasterNickName}" +
            "/{employeeMasterGender}/{maritalStatus}/{employeeMasterBirthDate}/{employeeMasterPersonID}/{employeeMasterTel1}/{empEmail}" +
            "/{empAddressReal}/{empAddressPerson}/{employeeMasterStartDate}/{employeePosition}/{employeeDepartment}/{employeeType}/{education}/{bank}/{bankNumber}") //Employee ADD
    public EmployeeMaster employeeMaster(@PathVariable String employeeMasterCustomerCode , @PathVariable String prefixSelect ,@PathVariable String employeeMasterFirstName
            , @PathVariable String employeeMasterLastName , @PathVariable String employeeMasterNickName , @PathVariable String employeeMasterGender
            , @PathVariable String maritalStatus , @PathVariable Date employeeMasterBirthDate , @PathVariable String employeeMasterPersonID
            , @PathVariable String employeeMasterTel1, @PathVariable String empEmail , @PathVariable String empAddressReal
            , @PathVariable String empAddressPerson , @PathVariable Date employeeMasterStartDate , @PathVariable String employeePosition
            , @PathVariable String employeeDepartment , @PathVariable String employeeType , @PathVariable String education
            , @PathVariable String bank , @PathVariable String bankNumber ) throws ParseException {

        EmployeeMaster employeeMaster1 = new EmployeeMaster();

       /* DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd:MM:yyyy");
        LocalDate BirthDate = LocalDate.parse(employeeMasterBirthDate, formatter);
        LocalDate Stratdate = LocalDate.parse(employeeMasterStartDate, formatter);*/


        employeeMaster1.setEmployeeMasterCustomerCode(employeeMasterCustomerCode);
        employeeMaster1.setPrefix(prefixSelect);
        employeeMaster1.setEmployeeMasterFirstName(employeeMasterFirstName);
        employeeMaster1.setEmployeeMasterLastName(employeeMasterLastName);
        employeeMaster1.setEmployeeMasterNickName(employeeMasterNickName);
        employeeMaster1.setEmployeeMasterGender(employeeMasterGender);
        employeeMaster1.setMaritalStatus(maritalStatus);

       /* SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");
        String[] dateSplit;
        dateSplit = employeeMasterBirthDate.split("-");
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' +dateSplit[2];//dateSplit[2];
        Date date2=formatter2.parse(fullPatternyear);*/
        employeeMaster1.setEmployeeMasterBirthDate(employeeMasterBirthDate); // BirthDate

        employeeMaster1.setEmployeeMasterPersonID(employeeMasterPersonID);
        employeeMaster1.setEmployeeMasterTel1(employeeMasterTel1);
        employeeMaster1.setEmpEmail(empEmail);
        employeeMaster1.setEmpAddressReal(empAddressReal);
        employeeMaster1.setEmpAddressPerson(empAddressPerson);
        employeeMaster1.setEmployeeMasterStartDate(employeeMasterStartDate); // Stratdate
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

    @PostMapping(path = "/editemployee/{NewemployeeMasterID}/{NewemployeeMasterCustomerCode}/{Newprefix}/{NewemployeeMasterFirstName}" +
            "/{NewemployeeMasterLastName}/{NewemployeeMasterNickName}/{NewemployeeMasterGender}/{NewmaritalStatus}" +
            "/{NewemployeeMasterBirthDate}/{NewemployeeMasterPersonID}/{NewemployeeMasterTel1}/{NewempEmail}/{NewempAddressReal}" +
            "/{NewempAddressPerson}/{NewemployeeMasterStartDate}/{NewemployeePosition}/{NewemployeeDepartment}/{NewemployeeType}" +
            "/{Neweducation}/{Newbank}/{NewbankNumber}") // Edit Employee
    public EmployeeMaster employeeMaster(@PathVariable Long NewemployeeMasterID, @PathVariable String NewemployeeMasterCustomerCode,
                                         @PathVariable String Newprefix, @PathVariable String NewemployeeMasterFirstName,
                                         @PathVariable String NewemployeeMasterLastName, @PathVariable String NewemployeeMasterNickName,
                                         @PathVariable String NewemployeeMasterGender, @PathVariable String NewmaritalStatus,
                                         /*@PathVariable Date NewemployeeMasterBirthDate,*/ @PathVariable String NewemployeeMasterPersonID,
                                         @PathVariable String NewemployeeMasterTel1, @PathVariable String NewempEmail,
                                         @PathVariable String NewempAddressReal, @PathVariable String NewempAddressPerson,
                                         /*@PathVariable Date NewemployeeMasterStartDate,*/ @PathVariable String NewemployeePosition,
                                         @PathVariable String NewemployeeDepartment, @PathVariable String NewemployeeType,
                                         @PathVariable String Neweducation, @PathVariable String Newbank,
                                         @PathVariable String NewbankNumber){

        EmployeeMaster employeeMaster2 = employeeMasterRepository.findById(NewemployeeMasterID).get();

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd:MM:yyyy");
        //LocalDate Stratdate = LocalDate.parse(NewemployeeMasterStartDate, formatter);
        //LocalDate BirthDate = LocalDate.parse(NewemployeeMasterBirthDate, formatter);

        employeeMaster2.setEmployeeMasterCustomerCode(NewemployeeMasterCustomerCode);
        employeeMaster2.setPrefix(Newprefix);
        employeeMaster2.setEmployeeMasterFirstName(NewemployeeMasterFirstName);
        employeeMaster2.setEmployeeMasterLastName(NewemployeeMasterLastName);
        employeeMaster2.setEmployeeMasterNickName(NewemployeeMasterNickName);
        employeeMaster2.setEmployeeMasterGender(NewemployeeMasterGender);
        employeeMaster2.setMaritalStatus(NewmaritalStatus);
        //employeeMaster2.setEmployeeMasterBirthDate(NewemployeeMasterBirthDate);
        employeeMaster2.setEmployeeMasterPersonID(NewemployeeMasterPersonID);
        employeeMaster2.setEmployeeMasterTel1(NewemployeeMasterTel1);
        employeeMaster2.setEmpEmail(NewempEmail);
        employeeMaster2.setEmpAddressReal(NewempAddressReal);
        employeeMaster2.setEmpAddressPerson(NewempAddressPerson);
        //employeeMaster2.setEmployeeMasterStartDate(NewemployeeMasterStartDate);
        employeeMaster2.setEmployeePosition(NewemployeePosition);
        employeeMaster2.setEmployeeDepartment(NewemployeeDepartment);
        employeeMaster2.setEmployeeType(NewemployeeType);
        employeeMaster2.setEducation(Neweducation);
        employeeMaster2.setBank(Newbank);
        employeeMaster2.setBankNumber(NewbankNumber);
        employeeMasterRepository.save(employeeMaster2);
        return employeeMaster2;
    }


    @PostMapping(path = "/deleteEmployee/{NewemployeeMasterID}/{NewIsActive}") //Delete Employee
    public EmployeeMaster employeeMaster(@PathVariable Long NewemployeeMasterID,@PathVariable String NewIsActive) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(NewemployeeMasterID).get();
        employeeMaster.setIsActive("0");
        employeeMasterRepository.save(employeeMaster);
        return employeeMaster;
    }
}