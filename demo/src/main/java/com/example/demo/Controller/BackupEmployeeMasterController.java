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
public class BackupEmployeeMasterController {
    @Autowired private BackupEmployeeMasterRepository backupEmployeeMasterRepository;
    @Autowired private DepartmentRepository departmentRepository;

    @PostMapping(path = "/BackupEmployeeMaster/{NewemployeeMasterID}/{NewemployeeMasterCustomerCode}/{Newprefix}/{NewemployeeMasterFirstName}" +
            "/{NewemployeeMasterLastName}/{NewemployeeMasterNickName}/{NewemployeeMasterGender}/{NewmaritalStatus}" +
            "/{NewemployeeMasterBirthDate}/{NewemployeeMasterPersonID}/{NewemployeeMasterTel1}"+
            "/{NewemployeeMasterStartDate}/{NewemployeePosition}/{NewemployeeDepartment}/{NewemployeeType}" +
            "/{Neweducation}/{Newbank}/{NewbankNumber}/{Newpassword}/{fName}/{lName}/{NewRoleStatus}")
    public BackupEmployeeMaster backupEmployeeMaster(@RequestBody Map<String,String> body, @PathVariable Long NewemployeeMasterID, @PathVariable String NewemployeeMasterCustomerCode,
                                                     @PathVariable String Newprefix, @PathVariable String NewemployeeMasterFirstName,
                                                     @PathVariable String NewemployeeMasterLastName, @PathVariable String NewemployeeMasterNickName,
                                                     @PathVariable String NewemployeeMasterGender, @PathVariable String NewmaritalStatus,
                                                     @PathVariable String NewemployeeMasterBirthDate, @PathVariable String NewemployeeMasterPersonID,
                                                     @PathVariable String NewemployeeMasterTel1, @PathVariable String NewemployeeMasterStartDate, @PathVariable String NewemployeePosition,
                                                     @PathVariable String NewemployeeDepartment, @PathVariable String NewemployeeType,
                                                     @PathVariable String Neweducation, @PathVariable String Newbank,
                                                     @PathVariable String NewbankNumber, @PathVariable String Newpassword,
                                                     @PathVariable String fName , @PathVariable String lName, @PathVariable String NewRoleStatus) throws ParseException {
        Department department = departmentRepository.findByDepartmentName(NewemployeeDepartment);

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

        BackupEmployeeMaster backupEmployeeMaster = new BackupEmployeeMaster();
        backupEmployeeMaster.setCreate_date(new Date());
        backupEmployeeMaster.setCreate_by(fName+" "+lName);
        backupEmployeeMaster.setEmployeeMasterCustomerCode(NewemployeeMasterCustomerCode);
        backupEmployeeMaster.setPrefix(Newprefix);
        backupEmployeeMaster.setEmployeeMasterFirstName(NewemployeeMasterFirstName);
        backupEmployeeMaster.setEmployeeMasterLastName(NewemployeeMasterLastName);
        backupEmployeeMaster.setEmployeeMasterNickName(NewemployeeMasterNickName);
        backupEmployeeMaster.setEmployeeMasterGender(NewemployeeMasterGender);
        backupEmployeeMaster.setMaritalStatus(NewmaritalStatus);
        backupEmployeeMaster.setEmployeeMasterBirthDate(birthdate);
        backupEmployeeMaster.setEmployeeMasterPersonID(NewemployeeMasterPersonID);
        backupEmployeeMaster.setEmployeeMasterTel1(NewemployeeMasterTel1);
        backupEmployeeMaster.setEmpEmail(NewempEmail);
        backupEmployeeMaster.setEmpAddressReal(NewempAddressReal);
        backupEmployeeMaster.setEmpAddressPerson(NewempAddressPerson);
        backupEmployeeMaster.setEmergencyContact(NewemergencyContact);
        backupEmployeeMaster.setEmployeeMasterStartDate(startdate);
        backupEmployeeMaster.setEmployeePosition(NewemployeePosition);
        backupEmployeeMaster.setDepartmentid(department);
        backupEmployeeMaster.setEmployeeType(NewemployeeType);
        backupEmployeeMaster.setEducation(Neweducation);
        backupEmployeeMaster.setBank(Newbank);
        backupEmployeeMaster.setBankNumber(NewbankNumber);
        backupEmployeeMaster.setPassword(Newpassword);
        backupEmployeeMaster.setRoleStatus(NewRoleStatus);
        backupEmployeeMasterRepository.save(backupEmployeeMaster);
        return backupEmployeeMaster;
    }

}

