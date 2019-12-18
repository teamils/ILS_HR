package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


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

    @GetMapping("/showleave3/{employeeCode}")
    public Iterable<Leaves> leaves2(@PathVariable String employeeCode) {
        return this.leavesRepository.getLeaves2(employeeCode);
    }

   /* @PostMapping(path = "/savetotalAnnualLeave/{leaID}/{sumDate}") //Delete Attendance Data
    public Leaves leaves(@PathVariable Long leaID,@PathVariable int sumDate) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Leaves leaves1 = new Leaves();
        leaves1.setTotalAnnualLeave(sumDate);
        leaves1.setEmployeeMasterid(employeeMaster);
        return leavesRepository.save(leaves1);
    }*/
    @PostMapping("/leave/{leaID}/{leaveTypeSelect}/{labelLeaveHalfDay}/{startDate}/{reason}") // saveLeave ครึ่งวัน
    public Leaves leaves( @PathVariable Long leaID , @PathVariable String leaveTypeSelect ,@PathVariable String labelLeaveHalfDay
            , @PathVariable Date startDate , @PathVariable String reason ){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Date createDate = new Date();

        Leaves leaves1 = new Leaves();
        leaves1.setEmployeeMasterid(employeeMaster);
        leaves1.setCreateDate(createDate);
        leaves1.setLeaveTypeForHalfDay(leaveTypeSelect);
        leaves1.setStartDateForHalfDay(startDate);
        leaves1.setReasonForHalfDay(reason);
        leaves1.setLabelLeaveHalfDay(labelLeaveHalfDay);

        leaves1.setApprovedBySupervisor("not approved");
        leaves1.setApprovedByManager("not approved");
        leaves1.setIsActiveAttendance("1");
        leaves1.setLeaveStatus("Waiting");
        leavesRepository.save(leaves1);
        return leaves1;
    }

    @PostMapping("/leave2/{leaID}/{leaveTypeSelect2}/{startDate2}/{endDate2}/{reason2}") // saveLeave2 เต็มวัน
    public Leaves leaves2( @PathVariable Long leaID , @PathVariable String leaveTypeSelect2 ,@PathVariable Date startDate2
            , @PathVariable Date endDate2 , @PathVariable String reason2 ){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Date createDate = new Date();

        Leaves leaves2 = new Leaves();
        leaves2.setEmployeeMasterid(employeeMaster);
        leaves2.setCreateDate(createDate);
        leaves2.setLeaveTypeForAllDay(leaveTypeSelect2);
        leaves2.setStartDateForAllDay(startDate2);
        leaves2.setEndDateForAllDay(endDate2);
        leaves2.setReasonForAllDay(reason2);

        leaves2.setApprovedBySupervisor("not approved");
        leaves2.setApprovedByManager("not approved");
        leaves2.setIsActiveAttendance("1");
        leaves2.setLeaveStatus("Waiting");
        leavesRepository.save(leaves2);
        return leaves2;
    }

    @PostMapping(path = "/deleteAttendance/{leavesID}") //Delete Attendance Data
    public Leaves leaves(@PathVariable Long leavesID) {
        Leaves leaves = leavesRepository.findById(leavesID).get();
        leaves.setIsActiveAttendance("0");
        leavesRepository.save(leaves);
        return leaves;
    }

    @PostMapping(path = "/saveleaveNumber/{empId}/{sumDateime}") //saveleaveNumber Set Default
    public LeavesNumbers leavesNumbers(@PathVariable Long empId,@PathVariable int sumDateime) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        LeavesNumbers leavesNumbers = new LeavesNumbers();
        leavesNumbers.setEmployeeMasterid(employeeMaster);
        leavesNumbers.setTotalAnnualLeave(sumDateime);
        leavesNumbers.setTotalSickLeave(30);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }

    @PostMapping(path = "/saveleaveNumber2/{empId}/{sumDateime}") //saveleaveNumber2
    public LeavesNumbers leavesNumbers2(@PathVariable Long empId,@PathVariable int sumDateime) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        LeavesNumbers leavesNumbers = new LeavesNumbers();
        leavesNumbers.setEmployeeMasterid(employeeMaster);
        leavesNumbers.setTotalAnnualLeave(sumDateime);
        leavesNumbers.setTotalSickLeave(30);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }

    @PostMapping(path = "/CancelLeave/{leavesID}") //Cancel Leave
    public Leaves leaves2(@PathVariable Long leavesID) {
        Leaves leaves = leavesRepository.findById(leavesID).get();
        leaves.setLeaveStatus("Cancel");
        leavesRepository.save(leaves);
        return leaves;
    }
}
