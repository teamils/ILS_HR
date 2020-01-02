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
public class LeavesNumbersController {
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private LeavesNumbersRepository leavesNumbersRepository;
    @Autowired private LeavesRepository leavesRepository;
    @Autowired private LeaveTypeForAlldayRepository leaveTypeForAlldayRepository;
    @Autowired private MasterAttendanceRepository masterAttendanceRepository;

    @PostMapping(path = "/saveleaveNumber/{empId}/{sumDay_365}") //saveleaveNumber Set Default
    public LeavesNumbers leavesNumbers(@PathVariable Long empId,@PathVariable int sumDay_365) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        MasterAttendance masterAttendance = masterAttendanceRepository.findByYear(sumDay_365);
        LeaveTypeForAllday setleaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName("ลาพักร้อน");
        setleaveTypeForAllday.setDefaultLeaveDay(masterAttendance.getDayLeave());
        for(long i=1;i<=8;i++){
            LeavesNumbers saveleaveNumber = new LeavesNumbers();
            LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findById(i).get();
            saveleaveNumber.setEmployeeMasterid(employeeMaster);
            saveleaveNumber.setLeaveTypeid(leaveTypeForAllday);
            saveleaveNumber.setGetDay(leaveTypeForAllday.getDefaultLeaveDay());
            saveleaveNumber.setBalanceDay(leaveTypeForAllday.getDefaultLeaveDay());
            leavesNumbersRepository.save(saveleaveNumber);
        }
        return null;
    }

    @GetMapping("/show1rowof1person/{empID}/{leaveID}")
    public Iterable<LeavesNumbers> show1rowof1person(@PathVariable String empID,@PathVariable String leaveID) {
        LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName(leaveID);
        return this.leavesNumbersRepository.show1rowof1person(empID,leaveTypeForAllday.getLeaveTypeForAlldayID());
    }

    @PostMapping("/UpdateLeaveNumber/{leavesNumbersID}/{diffDay}")
    public LeavesNumbers UpdateLeaveNumber( @PathVariable long leavesNumbersID,@PathVariable int diffDay){
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findById(leavesNumbersID).get();
        leavesNumbers.setUsedDay(leavesNumbers.getUsedDay()+diffDay);
        leavesNumbers.setBalanceDay(leavesNumbers.getBalanceDay() - diffDay);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }
}
