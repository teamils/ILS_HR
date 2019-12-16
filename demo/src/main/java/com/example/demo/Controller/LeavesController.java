package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import java.text.ParseException;


@RestController
@CrossOrigin(origins = "*")
public class LeavesController {

    @Autowired private  LeavesRepository leavesRepository;
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private LeavesNumbersRepository leavesNumbersRepository;

    @GetMapping(path = "/leave/{leaID}")
    public Leaves leaves(@PathVariable long leaID) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Leaves leaves = leavesRepository.findByemployeeMasterid(employeeMaster);
        return leaves;
    }
    @GetMapping(path = "/showleaveNumber/{leaID}")
    public LeavesNumbers leavesNumbers(@PathVariable long leaID) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findByemployeeMasterid(employeeMaster);
        return leavesNumbers;
    }

    @GetMapping(path = "/leaves")
    public Collection<Leaves> leaves() {
        return leavesRepository.findAll().stream().filter(this::Active).collect(Collectors.toList());
    }
    private boolean Active(Leaves leaves) {
        return leaves.getIsActiveAttendance().equals("1");
    }

    @GetMapping("/showleave2/{employeeCode}")
    public Iterable<Leaves> leaves(@PathVariable String employeeCode) {
        return this.leavesRepository.getLeaves(employeeCode);
    }

   /* @PostMapping(path = "/savetotalAnnualLeave/{leaID}/{sumDate}") //Delete Attendance Data
    public Leaves leaves(@PathVariable Long leaID,@PathVariable int sumDate) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Leaves leaves1 = new Leaves();
        leaves1.setTotalAnnualLeave(sumDate);
        leaves1.setEmployeeMasterid(employeeMaster);
        return leavesRepository.save(leaves1);
    }*/
    @PostMapping("/leave/{leaID}/{leaveTypeSelect}/{startDate}/{endDate}/{startTime}/{endTime}/{reason}")
    public Leaves leaves( @PathVariable Long leaID , @PathVariable Date startDate ,@PathVariable String leaveTypeSelect
            , @PathVariable Date endDate , @PathVariable String startTime , @PathVariable String endTime
            , @PathVariable String reason ){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Date leaveDate = new Date();

        Leaves leaves1 = new Leaves();
        leaves1.setEmployeeMasterid(employeeMaster);
        leaves1.setLeaveType(leaveTypeSelect);
        leaves1.setLeavesDate(leaveDate);

       /* SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String startDateToString = formatter.format(startDate);
        String[] dateSplit;
        dateSplit = startDateToString.split("-");
        String fullPatternyear = dateSplit[0] + '-' + dateSplit[1] + '-' +dateSplit[2];//dateSplit[2];
        System.out.println(fullPatternyear);
        Date startDateToDate = formatter.parse(fullPatternyear);*/
        leaves1.setStartDate(startDate);

        leaves1.setEndDate(endDate);
        leaves1.setStartTime(startTime);
        leaves1.setEndTime(endTime);
        leaves1.setReason(reason);
        leaves1.setApprovedBySupervisor("not approved");
        leaves1.setApprovedByManager("not approved");
        leaves1.setIsActiveAttendance("1");
        leavesRepository.save(leaves1);
        return leaves1;
    }

    @PostMapping(path = "/deleteAttendance/{leavesID}") //Delete Attendance Data
    public Leaves leaves(@PathVariable Long leavesID) {
        Leaves leaves = leavesRepository.findById(leavesID).get();
        leaves.setIsActiveAttendance("0");
        leavesRepository.save(leaves);
        return leaves;
    }

    @PostMapping(path = "/saveleaveNumber/{empId}/{sumDateime}") //Delete Attendance Data
    public LeavesNumbers leavesNumbers(@PathVariable Long empId,@PathVariable int sumDateime) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        LeavesNumbers leavesNumbers = new LeavesNumbers();
        leavesNumbers.setEmployeeMasterid(employeeMaster);
        leavesNumbers.setTotalAnnualLeave(sumDateime);
        leavesNumbers.setTotalSickLeave(30);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }
}
