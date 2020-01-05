package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.example.demo.Repository.ComboboxRepository.LeaveTypeForAlldayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*")
public class LeavesNumbersController {
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private LeavesNumbersRepository leavesNumbersRepository;
    @Autowired private LeavesRepository leavesRepository;
    @Autowired private LeaveTypeForAlldayRepository leaveTypeForAlldayRepository;
    @Autowired private MasterAttendanceRepository masterAttendanceRepository;

    @PostMapping(path = "/saveleaveNumber/{empId}/{sumDay_365}/{leaveTypeForAlldaysLength}/{fName}/{lName}") //saveleaveNumber Set Default
    public LeavesNumbers leavesNumbers(@PathVariable Long empId,@PathVariable int sumDay_365,
                                       @PathVariable int leaveTypeForAlldaysLength,
                                       @PathVariable String fName,@PathVariable String lName) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        MasterAttendance masterAttendance = masterAttendanceRepository.findByYear(sumDay_365);
        LeaveTypeForAllday setleaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName("ลาพักร้อน");
        setleaveTypeForAllday.setDefaultLeaveDay(masterAttendance.getDayLeave());
        for(long i=1;i<=leaveTypeForAlldaysLength;i++){
            LeavesNumbers saveleaveNumber = new LeavesNumbers();
            LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findById(i).get();
            saveleaveNumber.setEmployeeMasterid(employeeMaster);
            saveleaveNumber.setLeaveTypeid(leaveTypeForAllday);
            saveleaveNumber.setGetDay(leaveTypeForAllday.getDefaultLeaveDay());
            saveleaveNumber.setBalanceDay(leaveTypeForAllday.getDefaultLeaveDay());
            saveleaveNumber.setCreate_Date(new Date());
            saveleaveNumber.setCreate_by(fName+" "+lName);
            leavesNumbersRepository.save(saveleaveNumber);
        }
        return null;
    }

    @GetMapping("/show1rowof1person/{empID}/{leaveID}")
    public Iterable<LeavesNumbers> show1rowof1person(@PathVariable String empID,@PathVariable String leaveID) {
        LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName(leaveID);
        return this.leavesNumbersRepository.show1rowof1person(empID,leaveTypeForAllday.getLeaveTypeForAlldayID());
    }

    @PostMapping("/UpdateLeaveNumber/{leavesNumbersID}/{diffDay}/{fName}/{lName}")
    public LeavesNumbers UpdateLeaveNumber( @PathVariable long leavesNumbersID,@PathVariable int diffDay,@PathVariable String fName,@PathVariable String lName){
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findById(leavesNumbersID).get();
        //LeaveTypeForAllday setleaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName("ลาพักร้อน");
        leavesNumbers.setUsedDay(leavesNumbers.getUsedDay()+diffDay);
        int balance = leavesNumbers.getBalanceDay() - diffDay;
        leavesNumbers.setBalanceDay(balance);
        leavesNumbers.setDiffDay(diffDay);

        /*if(setleaveTypeForAllday.getLeaveTypeForAlldayName()=="ลาพักร้อน") {
            if (balance < 0)
                leavesNumbers.setCompoundDay(0);
             else
                 leavesNumbers.setCompoundDay(balance);
        }*/
        leavesNumbers.setUpdate_Date(new Date());
        leavesNumbers.setUpdate_by(fName+" "+lName);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }
}
