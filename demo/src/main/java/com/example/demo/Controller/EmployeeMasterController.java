package com.example.demo.Controller;

import com.example.demo.Entity.Combobox.Department;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.example.demo.Repository.ComboboxRepository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
@CrossOrigin("*")
public class EmployeeMasterController {


    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private DepartmentRepository departmentRepository;

    @GetMapping("/ILS_HR/{employee}")
    public Iterable<EmployeeMaster> employeeMasters(@PathVariable String employee) {
        return this.employeeMasterRepository.QueryEmployee();
    }

    @GetMapping("/getemployee1person/{empID}")
    public Iterable<EmployeeMaster> getemployee1person(@PathVariable long empID) {
        return this.employeeMasterRepository.QueryEmployee1person(empID);
    }
   /* @GetMapping("/SearchEmployee/{dataSearch}")
    public Iterable<EmployeeMaster> employeeMasters2(@PathVariable String dataSearch) {
        return this.employeeMasterRepository.QueryEmployeeForCodeAndName();
    }*/

    /*@GetMapping(path = "ILS_HR/employee")
    public Collection<EmployeeMaster> employeeMaster() {
        return employeeMasterRepository.findAll().stream().filter(this::Active).collect(Collectors.toList());
    }
    private boolean Active(EmployeeMaster employeeMaster) {
        return employeeMaster.getIsActive().equals("1");
    }*/

    @GetMapping(path = "/SearchEmployeeForAttendance/{employeeMasterCustomerCode}") //SearchEmployeeForAttendance
    public EmployeeMaster employeeMaster(@PathVariable String employeeMasterCustomerCode) {
        //System.out.println("employeeMasterCustomerCode = "+employeeMasterCustomerCode);
        EmployeeMaster employeeMaster = employeeMasterRepository.findByemployeeMasterCustomerCode(employeeMasterCustomerCode);
        return employeeMaster;
    }

    @GetMapping(path = "/SearchEmployeeForAttendance2/{id}") //SearchEmployeeForAttendance2
    public EmployeeMaster employeeMaster(@PathVariable Long id) {
        return employeeMasterRepository.findById(id).get();

    }

    @GetMapping(path = "/login/{employeeCode}/{password}") //login
    public EmployeeMaster employeeMaster(@PathVariable String employeeCode , @PathVariable String password) {
        //System.out.println("employeeMasterCustomerCode = "+employeeCode+"password = "+password);
        EmployeeMaster employeeMaster = employeeMasterRepository.findByemployeeMasterCustomerCodeAndPasswordAndIsActive(employeeCode,password,"1");
        return employeeMaster;
    }

    @PostMapping("/addEmployeeMaster/{employeeMasterCustomerCode}/{prefixSelect}/{employeeMasterFirstName}/{employeeMasterLastName}/{employeeMasterNickName}" +
            "/{employeeMasterGender}/{employeeMasterBirthDate}/{employeeMasterPersonID}/{employeeMasterTel1}" +
            "/{employeeMasterStartDate}/{employeePosition}/{employeeDepartment}/{employeeType}/{education}" +
            "/{bank}/{bankNumber}/{role_statusSelect}/{passwordCreate}/{fName}/{lName}") //Employee ADD
    public Collection<EmployeeMaster> employeeMaster(@RequestBody Map<String,String> body,@PathVariable String employeeMasterCustomerCode , @PathVariable String prefixSelect ,@PathVariable String employeeMasterFirstName
            , @PathVariable String employeeMasterLastName , @PathVariable String employeeMasterNickName , @PathVariable String employeeMasterGender
            , @PathVariable Date employeeMasterBirthDate , @PathVariable String employeeMasterPersonID
            , @PathVariable String employeeMasterTel1,@PathVariable Date employeeMasterStartDate , @PathVariable String employeePosition
            , @PathVariable String employeeDepartment , @PathVariable String employeeType  , @PathVariable String education
            , @PathVariable String bank , @PathVariable String bankNumber ,@PathVariable String role_statusSelect ,@PathVariable String fName ,@PathVariable String lName ) throws ParseException {

        String empEmailJson = body.get("empEmail").toString();
        String empAddressRealJson = body.get("empAddressReal").toString();
        String empAddressPersonJson = body.get("empAddressPerson").toString();
        String emergencyContactJson = body.get("emergencyContact").toString();

        Department department = departmentRepository.findByDepartmentName(employeeDepartment);
        EmployeeMaster employeeMaster1 = new EmployeeMaster();

       /* DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd:MM:yyyy");
        LocalDate BirthDate = LocalDate.parse(employeeMasterBirthDate, formatter);
        LocalDate Stratdate = LocalDate.parse(employeeMasterStartDate, formatter);*/

        employeeMaster1.setCreate_date(new Date());
        employeeMaster1.setCreate_by(fName+" "+lName);
        employeeMaster1.setEmployeeMasterCustomerCode(employeeMasterCustomerCode);
        employeeMaster1.setPrefix(prefixSelect);
        employeeMaster1.setEmployeeMasterFirstName(employeeMasterFirstName);
        employeeMaster1.setEmployeeMasterLastName(employeeMasterLastName);
        employeeMaster1.setEmployeeMasterNickName(employeeMasterNickName);
        employeeMaster1.setEmployeeMasterGender(employeeMasterGender);
        employeeMaster1.setMaritalStatus("ยังปฏิบัติงานอยู่");

       /* SimpleDateFormat formatter2=new SimpleDateFormat("dd-MM-yyyy");
        String[] dateSplit;
        dateSplit = employeeMasterBirthDate.split("-");
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' +dateSplit[2];//dateSplit[2];
        Date date2=formatter2.parse(fullPatternyear);*/
        employeeMaster1.setEmployeeMasterBirthDate(employeeMasterBirthDate); // BirthDate

        employeeMaster1.setEmployeeMasterPersonID(employeeMasterPersonID);
        employeeMaster1.setEmployeeMasterTel1(employeeMasterTel1);
        employeeMaster1.setEmpEmail(empEmailJson);
        employeeMaster1.setEmpAddressReal(empAddressRealJson);
        employeeMaster1.setEmpAddressPerson(empAddressPersonJson);
        employeeMaster1.setEmergencyContact(emergencyContactJson);
        employeeMaster1.setEmployeeMasterStartDate(employeeMasterStartDate); // Stratdate
        employeeMaster1.setEmployeePosition(employeePosition);
        employeeMaster1.setDepartmentid(department);
        employeeMaster1.setEmployeeType(employeeType);
        employeeMaster1.setEducation(education);
        employeeMaster1.setBank(bank);
        employeeMaster1.setBankNumber(bankNumber);
        employeeMaster1.setIsActive("1");
        employeeMaster1.setRoleStatus(role_statusSelect);
        employeeMaster1.setPassword(employeeMasterCustomerCode);
        employeeMasterRepository.save(employeeMaster1);
        return null;
    }

    @PostMapping(path = "/editemployee/{NewemployeeMasterID}/{NewemployeeMasterCustomerCode}/{Newprefix}/{NewemployeeMasterFirstName}" +
            "/{NewemployeeMasterLastName}/{NewemployeeMasterNickName}/{NewemployeeMasterGender}/{NewmaritalStatus}" +
            "/{NewemployeeMasterBirthDate}/{NewemployeeMasterPersonID}/{NewemployeeMasterTel1}" +
            "/{NewemployeeMasterStartDate}/{NewemployeePosition}/{NewemployeeDepartment}/{NewemployeeType}" +
            "/{Neweducation}/{Newbank}/{NewbankNumber}/{Newpassword}/{fName}/{lName}") // Edit Employee
    public EmployeeMaster employeeMaster(@RequestBody Map<String,String> body,@PathVariable Long NewemployeeMasterID, @PathVariable String NewemployeeMasterCustomerCode,
                                         @PathVariable String Newprefix, @PathVariable String NewemployeeMasterFirstName,
                                         @PathVariable String NewemployeeMasterLastName, @PathVariable String NewemployeeMasterNickName,
                                         @PathVariable String NewemployeeMasterGender, @PathVariable String NewmaritalStatus,
                                         @PathVariable String NewemployeeMasterBirthDate, @PathVariable String NewemployeeMasterPersonID,
                                         @PathVariable String NewemployeeMasterTel1, @PathVariable String NewemployeeMasterStartDate,
                                         @PathVariable String NewemployeePosition, @PathVariable String NewemployeeDepartment,
                                         @PathVariable String NewemployeeType, @PathVariable String Neweducation, @PathVariable String Newbank,
                                         @PathVariable String NewbankNumber,@PathVariable String Newpassword,
                                         @PathVariable String fName ,@PathVariable String lName) throws ParseException {
        Department department = departmentRepository.findByDepartmentName(NewemployeeDepartment);
        EmployeeMaster employeeMaster2 = employeeMasterRepository.findById(NewemployeeMasterID).get();

        String NewempEmail = body.get("NewempEmail").toString();
        String NewempAddressReal = body.get("NewempAddressReal").toString();
        String NewempAddressPerson = body.get("NewempAddressPerson").toString();
        String NewemergencyContact = body.get("NewemergencyContact").toString();

        String[] birthdatesplit;
        String[] startdatesplit;
        birthdatesplit = NewemployeeMasterBirthDate.split("-");
        startdatesplit = NewemployeeMasterStartDate.split("-");
        String bd;
        String sd;

        if(birthdatesplit.length !=3 ){
            birthdatesplit = NewemployeeMasterBirthDate.split(" ");
            birthdatesplit[3] = String.valueOf(Integer.parseInt(birthdatesplit[3]) + 543);
            if(birthdatesplit[1].equals("Jan")){birthdatesplit[1]="01";}else if(birthdatesplit[1].equals("Feb")){birthdatesplit[1]="02";}
            if(birthdatesplit[1].equals("Mar")){birthdatesplit[1]="03";}else if(birthdatesplit[1].equals("Apr")){birthdatesplit[1]="04";}
            if(birthdatesplit[1].equals("May")){birthdatesplit[1]="05";}else if(birthdatesplit[1].equals("Jun")){birthdatesplit[1]="06";}
            if(birthdatesplit[1].equals("Jul")){birthdatesplit[1]="07";}else if(birthdatesplit[1].equals("Aug")){birthdatesplit[1]="08";}
            if(birthdatesplit[1].equals("Sep")){birthdatesplit[1]="09";}else if(birthdatesplit[1].equals("Oct")){birthdatesplit[1]="10";}
            if(birthdatesplit[1].equals("Nov")){birthdatesplit[1]="11";}else if(birthdatesplit[1].equals("Dec")){birthdatesplit[1]="12";}
             bd = birthdatesplit[3] + "-"+birthdatesplit[1]+"-" +birthdatesplit[2];
        }else{


            birthdatesplit[0] = String.valueOf(Integer.parseInt(birthdatesplit[0]) + 543);
             bd = birthdatesplit[0] + "-"+birthdatesplit[1]+"-" +birthdatesplit[2];

        }

        if(startdatesplit.length !=3 ){
            startdatesplit = NewemployeeMasterStartDate.split(" ");
            startdatesplit[3] = String.valueOf(Integer.parseInt(startdatesplit[3]) + 543);
            if(startdatesplit[1].equals("Jan")){startdatesplit[1]="01";}else if(startdatesplit[1].equals("Feb")){startdatesplit[1]="02";}
            if(startdatesplit[1].equals("Mar")){startdatesplit[1]="03";}else if(startdatesplit[1].equals("Apr")){startdatesplit[1]="04";}
            if(startdatesplit[1].equals("May")){startdatesplit[1]="05";}else if(startdatesplit[1].equals("Jun")){startdatesplit[1]="06";}
            if(startdatesplit[1].equals("Jul")){startdatesplit[1]="07";}else if(startdatesplit[1].equals("Aug")){startdatesplit[1]="08";}
            if(startdatesplit[1].equals("Sep")){startdatesplit[1]="09";}else if(startdatesplit[1].equals("Oct")){startdatesplit[1]="10";}
            if(startdatesplit[1].equals("Nov")){startdatesplit[1]="11";}else if(startdatesplit[1].equals("Dec")){startdatesplit[1]="12";}
             sd = startdatesplit[3] + "-"+startdatesplit[1]+"-" +startdatesplit[2];
        }else{

            startdatesplit[0] = String.valueOf(Integer.parseInt(startdatesplit[0]) + 543);
             sd = startdatesplit[0] + "-"+startdatesplit[1]+"-" +startdatesplit[2];

        }


        Date birthdate=new SimpleDateFormat("yyyy-MM-dd").parse(bd);
        Date startdate=new SimpleDateFormat("yyyy-MM-dd").parse(sd);

        employeeMaster2.setUpdate_date(new Date());
        employeeMaster2.setUpdate_by(fName+" "+lName);
        employeeMaster2.setEmployeeMasterCustomerCode(NewemployeeMasterCustomerCode);
        employeeMaster2.setPrefix(Newprefix);
        employeeMaster2.setEmployeeMasterFirstName(NewemployeeMasterFirstName);
        employeeMaster2.setEmployeeMasterLastName(NewemployeeMasterLastName);
        employeeMaster2.setEmployeeMasterNickName(NewemployeeMasterNickName);
        employeeMaster2.setEmployeeMasterGender(NewemployeeMasterGender);
        employeeMaster2.setMaritalStatus(NewmaritalStatus);
        employeeMaster2.setEmployeeMasterBirthDate(birthdate);
        employeeMaster2.setEmployeeMasterPersonID(NewemployeeMasterPersonID);
        employeeMaster2.setEmployeeMasterTel1(NewemployeeMasterTel1);
        employeeMaster2.setEmpEmail(NewempEmail);
        employeeMaster2.setEmpAddressReal(NewempAddressReal);
        employeeMaster2.setEmpAddressPerson(NewempAddressPerson);
        employeeMaster2.setEmergencyContact(NewemergencyContact);
        employeeMaster2.setEmployeeMasterStartDate(startdate);
        employeeMaster2.setEmployeePosition(NewemployeePosition);
        employeeMaster2.setDepartmentid(department);
        employeeMaster2.setEmployeeType(NewemployeeType);
        employeeMaster2.setEducation(Neweducation);
        employeeMaster2.setBank(Newbank);
        employeeMaster2.setBankNumber(NewbankNumber);
        employeeMaster2.setPassword(Newpassword);
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

    @GetMapping("/SearchEmpCode/{empCode}")
    public EmployeeMaster SearchEmpCode(@PathVariable String empCode) {
        EmployeeMaster SearchEmpCode =  employeeMasterRepository.findByemployeeMasterCustomerCode(empCode);
        return SearchEmpCode;

    }

    @GetMapping("/SearchEmployeeInReport/{searchDate}/{gender}/{departmentID}/{position}/{empType}")
    public Iterable<EmployeeMaster> SearchEmployeeInReport(@PathVariable String searchDate,@PathVariable String gender,
                                                           @PathVariable String departmentID,@PathVariable String position,
                                                           @PathVariable String empType){
        if(searchDate.equals("undefined")||searchDate.equals("null")) searchDate="";
        if(gender.equals("undefined")||gender.equals("null")) gender="";
        if(departmentID.equals("undefined")||departmentID.equals("null")) departmentID="";
        if(position.equals("undefined")||position.equals("null")) position="";
        if(empType.equals("undefined")||empType.equals("null")) empType="";
        return this.employeeMasterRepository.SearchEmployeeInReport(searchDate,gender,departmentID,position,empType);
    }

}