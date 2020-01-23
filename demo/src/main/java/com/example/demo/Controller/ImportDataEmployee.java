package com.example.demo.Controller;

import com.example.demo.Entity.Combobox.Department;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.example.demo.Repository.ComboboxRepository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@RestController
@CrossOrigin(origins = "*")
public class ImportDataEmployee {
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private DepartmentRepository departmentRepository;

    @PostMapping(path = "/importData/{birthDate}/{startDate}") //login
    public Collection<EmployeeMaster> employeeMaster(@RequestBody Map<String,String> body, @PathVariable Date birthDate, @PathVariable Date startDate){
        String employeeMasterCustomerCode = body.get("employeeMasterCustomerCode").toString();
        String prefix = body.get("prefix").toString();
        String employeeMasterFirstName = body.get("employeeMasterFirstName").toString();
        String employeeMasterLastName = body.get("employeeMasterLastName").toString();
        String employeeMasterNickName = body.get("employeeMasterNickName").toString();
        String employeeMasterGender = body.get("employeeMasterGender").toString();
        String employeeMasterBirthDate = body.get("employeeMasterBirthDate").toString();
        String maritalStatus = body.get("maritalStatus").toString();
        String employeeMasterPersonID = body.get("employeeMasterPersonID").toString();
        String employeeMasterTel1 = body.get("employeeMasterTel1").toString();
        String empEmail = body.get("empEmail").toString();
        String employeeMasterStartDate = body.get("employeeMasterStartDate").toString();
        String empAddressReal = body.get("empAddressReal").toString();
        String empAddressPerson = body.get("empAddressPerson").toString();
        String emergencyContact = body.get("emergencyContact").toString();
        String employeeDepartment = body.get("employeeDepartment").toString();
        String employeePosition = body.get("employeePosition").toString();
        String employeeType = body.get("employeeType").toString();
        String education = body.get("education").toString();
        String bank = body.get("bank").toString();
        String bankNumber = body.get("bankNumber").toString();
        String roleStatus = body.get("roleStatus").toString();
        //System.out.println(body);

        Department departmentName = departmentRepository.findByDepartmentName(employeeDepartment);
        EmployeeMaster employeeMaster1 = new EmployeeMaster();
        employeeMaster1.setCreate_date(new Date());
        employeeMaster1.setEmployeeMasterCustomerCode(employeeMasterCustomerCode);
        employeeMaster1.setPrefix(prefix);
        employeeMaster1.setEmployeeMasterFirstName(employeeMasterFirstName);
        employeeMaster1.setEmployeeMasterLastName(employeeMasterLastName);
        employeeMaster1.setEmployeeMasterNickName(employeeMasterNickName);
        employeeMaster1.setEmployeeMasterGender(employeeMasterGender);
        employeeMaster1.setMaritalStatus(maritalStatus);
        employeeMaster1.setEmployeeMasterBirthDate(birthDate); // BirthDate
        employeeMaster1.setEmployeeMasterPersonID(employeeMasterPersonID);
        employeeMaster1.setEmployeeMasterTel1(employeeMasterTel1);
        employeeMaster1.setEmpEmail(empEmail);
        employeeMaster1.setEmpAddressReal(empAddressReal);
        employeeMaster1.setEmpAddressPerson(empAddressPerson);
        employeeMaster1.setEmergencyContact(emergencyContact);
        employeeMaster1.setEmployeeMasterStartDate(startDate); // Stratdate
        employeeMaster1.setEmployeePosition(employeePosition);
        employeeMaster1.setDepartmentid(departmentName);
        employeeMaster1.setEmployeeType(employeeType);
        employeeMaster1.setEducation(education);
        employeeMaster1.setBank(bank);
        employeeMaster1.setBankNumber(bankNumber);
        employeeMaster1.setIsActive("1");
        employeeMaster1.setRoleStatus(roleStatus);
        employeeMasterRepository.save(employeeMaster1);
        return null;
    }


}
