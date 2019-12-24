package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
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

    @PostMapping("/SaveLeaveHalfDay/{leaID}/{leaveTypeSelect}/{labelLeaveHalfDay}/{startDate}/{reason}/{startTimeSelect}/{endTimeSelect}") // saveLeave ครึ่งวัน
    public Leaves leaves( @PathVariable Long leaID , @PathVariable String leaveTypeSelect ,@PathVariable String labelLeaveHalfDay
            , @PathVariable Date startDate , @PathVariable String reason, @PathVariable String startTimeSelect, @PathVariable String endTimeSelect ) throws ParseException {

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");
        Date date = new Date();
        Date time = new Date();
        String datetest = dateFormat.format(date);
        String datetest2 = dateFormat2.format(time);
        String[] arryA = datetest.split("-");
        int result = Integer.parseInt(arryA[2]);
        int arryA_3 = result-543;
        String datetrue = arryA_3+"-"+arryA[1]+"-"+arryA[0]+" "+datetest2;

        Leaves leaves1 = new Leaves();
        leaves1.setEmployeeMasterid(employeeMaster);
        leaves1.setCreateDate(datetrue);
        leaves1.setLeaveTypeForAllDay(leaveTypeSelect);
        leaves1.setStartDateForAllDay(startDate);
        leaves1.setStartTime(startTimeSelect);
        leaves1.setEndTime(endTimeSelect);
        leaves1.setEndDateForAllDay(startDate);
        leaves1.setReasonForAllDay(reason);
        leaves1.setLabelLeaveHalfDay(labelLeaveHalfDay);

        leaves1.setApprovedBySupervisor("Pending");
        leaves1.setApprovedByManager("Pending");
        leaves1.setIsActiveAttendance("1");
        leaves1.setLeaveStatus("Pending");
        leavesRepository.save(leaves1);
        return leaves1;
    }

    @PostMapping("/SaveLeaveFullDay/{leaID}/{leaveTypeSelect2}/{startDate2}/{endDate2}/{reason2}/{diffDay}") // saveLeave2 เต็มวัน
    public Leaves leaves2( @PathVariable Long leaID , @PathVariable String leaveTypeSelect2 ,@PathVariable Date startDate2
            , @PathVariable Date endDate2 , @PathVariable String reason2  , @PathVariable String diffDay){

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");
        Date date = new Date();
        Date time = new Date();
        String datetest = dateFormat.format(date);
        String datetest2 = dateFormat2.format(time);
        String[] arryA = datetest.split("-");
        int result = Integer.parseInt(arryA[2]);
        int arryA_3 = result-543;
        String datetrue = arryA_3+"-"+arryA[1]+"-"+arryA[0]+" "+datetest2;

        Leaves leaves2 = new Leaves();
        leaves2.setEmployeeMasterid(employeeMaster);
        leaves2.setCreateDate(datetrue);
        leaves2.setLeaveTypeForAllDay(leaveTypeSelect2);
        leaves2.setStartDateForAllDay(startDate2);
        leaves2.setEndDateForAllDay(endDate2);
        leaves2.setStartTime("08:00");
        leaves2.setEndTime("17:00");
        leaves2.setReasonForAllDay(reason2);
        leaves2.setLabelLeaveHalfDay(diffDay + " ว ัน");

        leaves2.setApprovedBySupervisor("Pending");
        leaves2.setApprovedByManager("Pending");
        leaves2.setIsActiveAttendance("1");
        leaves2.setLeaveStatus("Pending");
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

   /* @PostMapping(path = "/saveleaveNumber/{empId}/{sumDateime}") //saveleaveNumber Set Default
    public LeavesNumbers leavesNumbers(@PathVariable Long empId,@PathVariable int sumDateime) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        LeavesNumbers leavesNumbers = new LeavesNumbers();
        leavesNumbers.setEmployeeMasterid(employeeMaster);
        leavesNumbers.setTotalAnnualLeave(sumDateime);
        leavesNumbers.setTotalSickLeave(30);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }*/

  /*  @PostMapping(path = "/saveleaveNumber2/{empId}/{sumDateime}") //saveleaveNumber2
    public LeavesNumbers leavesNumbers2(@PathVariable Long empId,@PathVariable int sumDateime) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empId).get();
        LeavesNumbers leavesNumbers = new LeavesNumbers();
        leavesNumbers.setEmployeeMasterid(employeeMaster);
        leavesNumbers.setTotalAnnualLeave(sumDateime);
        leavesNumbers.setTotalSickLeave(30);
        leavesNumbersRepository.save(leavesNumbers);
        return leavesNumbers;
    }*/

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
        approveBySupervisor.setLeaveStatus("Pending");
        leavesRepository.save(approveBySupervisor);
        return approveBySupervisor;
    }
    @PostMapping("/notApproveBySupervisor/{leavesID}/{reasonNotapprove}") // not ApproveBySupervisor
    public Leaves notApproveBySupervisor( @PathVariable Long leavesID, @PathVariable String reasonNotapprove){
        Leaves notApproveBySupervisor = leavesRepository.findById(leavesID).get();
        notApproveBySupervisor.setApprovedBySupervisor("Not approve");
        notApproveBySupervisor.setLeaveStatus("Supervisor not approve");
        notApproveBySupervisor.setReasonNotApprove(reasonNotapprove);
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
    @PostMapping("/notApproveByManager/{leavesID}/{reasonNotapprove}") // not ApproveByManager
    public Leaves notApproveByManager( @PathVariable Long leavesID,@PathVariable String reasonNotapprove){
        Leaves notApproveByManager = leavesRepository.findById(leavesID).get();
        notApproveByManager.setApprovedByManager("Not approve");
        notApproveByManager.setLeaveStatus("Not approved");
        notApproveByManager.setReasonNotApprove(reasonNotapprove);
        leavesRepository.save(notApproveByManager);
        return notApproveByManager;
    }
}
