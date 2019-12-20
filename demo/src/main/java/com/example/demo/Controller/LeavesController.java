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

    @GetMapping(path = "/LeavesToNotCompleteBySupervisor/{department}")
    public Iterable<Leaves> leaves(@PathVariable String department) {
        return this.leavesRepository.getLeavesToNotCompleteBySupervisor(department);
    }

    @GetMapping("/showleave3/{employeeCode}")
    public Iterable<Leaves> leaves2(@PathVariable String employeeCode) {
        return this.leavesRepository.getLeaves2(employeeCode);
    }
    @GetMapping("/showLeavesToComplete")
    public Iterable<Leaves> showLeavesToComplete() {
        return this.leavesRepository.getLeavesToComplete();
    }
    @GetMapping("/showLeavesToNotComplete")
    public Iterable<Leaves> showLeavesToNotComplete() {
        return this.leavesRepository.getLeavesToNotComplete();
    }
    @GetMapping(path = "/NotApproveBySup/{department}")
    public Iterable<Leaves> NotApproveBySup(@PathVariable String department) {
        return this.leavesRepository.getLeavesToNotApproveByManager(department);
    }

    @GetMapping("/LeavesSelectDepartment/{employeeCode}")
    public Iterable<Leaves> LeavesSelectDepartment(@PathVariable String employeeCode) {
        return this.leavesRepository.getLeavesSelectDepartment(employeeCode);
    }

    @PostMapping("/leave/{leaID}/{leaveTypeSelect}/{labelLeaveHalfDay}/{startDate}/{reason}") // saveLeave ครึ่งวัน
    public Leaves leaves( @PathVariable Long leaID , @PathVariable String leaveTypeSelect ,@PathVariable String labelLeaveHalfDay
            , @PathVariable Date startDate , @PathVariable String reason ){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Date createDate = new Date();

        Leaves leaves1 = new Leaves();
        leaves1.setEmployeeMasterid(employeeMaster);
        leaves1.setCreateDate(createDate);
        leaves1.setLeaveTypeForAllDay(leaveTypeSelect);
        leaves1.setStartDateForAllDay(startDate);
        leaves1.setEndDateForAllDay(startDate);
        leaves1.setReasonForAllDay(reason);
        leaves1.setLabelLeaveHalfDay(labelLeaveHalfDay);

        leaves1.setApprovedBySupervisor("Waiting approve");
        leaves1.setApprovedByManager("Waiting approve");
        leaves1.setIsActiveAttendance("1");
        leaves1.setLeaveStatus("Waiting");
        leavesRepository.save(leaves1);
        return leaves1;
    }

    @PostMapping("/leave2/{leaID}/{leaveTypeSelect2}/{startDate2}/{endDate2}/{reason2}/{diffDay}") // saveLeave2 เต็มวัน
    public Leaves leaves2( @PathVariable Long leaID , @PathVariable String leaveTypeSelect2 ,@PathVariable Date startDate2
            , @PathVariable Date endDate2 , @PathVariable String reason2  , @PathVariable String diffDay){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Date createDate = new Date();

        Leaves leaves2 = new Leaves();
        leaves2.setEmployeeMasterid(employeeMaster);
        leaves2.setCreateDate(createDate);
        leaves2.setLeaveTypeForAllDay(leaveTypeSelect2);
        leaves2.setStartDateForAllDay(startDate2);
        leaves2.setEndDateForAllDay(endDate2);
        leaves2.setReasonForAllDay(reason2);
        leaves2.setLabelLeaveHalfDay(diffDay + " ว ัน");

        leaves2.setApprovedBySupervisor("Waiting approve");
        leaves2.setApprovedByManager("Waiting approve");
        leaves2.setIsActiveAttendance("1");
        leaves2.setLeaveStatus("Waiting");
        leavesRepository.save(leaves2);
        return leaves2;
    }

    @PostMapping(path = "/deleteAttendance/{leavesID}") //Delete Attendance Data
    public Leaves leaves(@PathVariable Long leavesID) {
        Leaves leaves = leavesRepository.findById(leavesID).get();
        leaves.setLeaveStatus("Cancel");
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
        leaves.setIsActiveAttendance("0");
        leavesRepository.save(leaves);
        return leaves;
    }

    @PostMapping("/approveBySupervisor/{leavesID}/{firstNameOnLogin}/{lastNameOnLogin}") // approveBySupervisor
    public Leaves approveBySupervisor( @PathVariable Long leavesID,@PathVariable String firstNameOnLogin,@PathVariable String lastNameOnLogin){
        Leaves approveBySupervisor = leavesRepository.findById(leavesID).get();
        String name = firstNameOnLogin +"  "+ lastNameOnLogin;
        approveBySupervisor.setApprovedBySupervisor(name);
        leavesRepository.save(approveBySupervisor);
        return approveBySupervisor;
    }
    @PostMapping("/notApproveBySupervisor/{leavesID}") // not ApproveBySupervisor
    public Leaves notApproveBySupervisor( @PathVariable Long leavesID){
        Leaves notApproveBySupervisor = leavesRepository.findById(leavesID).get();
        notApproveBySupervisor.setApprovedBySupervisor("Not approve");
        notApproveBySupervisor.setLeaveStatus("NotApproveBySup");
        leavesRepository.save(notApproveBySupervisor);
        return notApproveBySupervisor;
    }
    @PostMapping("/approveByManager/{leavesID}/{firstNameOnLogin}/{lastNameOnLogin}") // approveByManager
    public Leaves approveByManager( @PathVariable Long leavesID,@PathVariable String firstNameOnLogin,@PathVariable String lastNameOnLogin){
        Leaves approveByManager = leavesRepository.findById(leavesID).get();
        String name = firstNameOnLogin +"  "+ lastNameOnLogin;
        approveByManager.setApprovedByManager(name);
        approveByManager.setLeaveStatus("Complete");
        leavesRepository.save(approveByManager);
        return approveByManager;
    }
    @PostMapping("/notApproveByManager/{leavesID}") // not ApproveBySupervisor
    public Leaves notApproveByManager( @PathVariable Long leavesID){
        Leaves notApproveByManager = leavesRepository.findById(leavesID).get();
        notApproveByManager.setApprovedByManager("Not approve");
        notApproveByManager.setLeaveStatus("Not complete");
        leavesRepository.save(notApproveByManager);
        return notApproveByManager;
    }
}
