package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.Department;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.example.demo.Repository.ComboboxRepository.DepartmentRepository;
import com.example.demo.Repository.ComboboxRepository.LeaveTypeForAlldayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@RestController
@CrossOrigin(origins = "*")
public class LeavesController {

    @Autowired private  LeavesRepository leavesRepository;
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private LeavesNumbersRepository leavesNumbersRepository;
    @Autowired private LeaveTypeForAlldayRepository leaveTypeForAlldayRepository;
    @Autowired private MasterAttendanceRepository masterAttendanceRepository;
    @Autowired private DepartmentMasterRoleRepository departmentMasterRoleRepository;
    @Autowired private DepartmentRepository departmentRepository;

    @GetMapping(path = "/showLeavesFindByID/{leavesID}")
    public Leaves showLeavesFindByID(@PathVariable long leavesID) {
        return leavesRepository.findById(leavesID).get();
    }

    @GetMapping(path = "/leave/{leaID}")
    public Leaves leaves(@PathVariable long leaID) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        Leaves leaves = leavesRepository.findByemployeeMasterid(employeeMaster);
        return leaves;
    }
    @GetMapping("/showleaveNumber/{leaID}")
    public Iterable<LeavesNumbers> leavesNumbers(@PathVariable String leaID) {
        return this.leavesNumbersRepository.getLeaveNumber(leaID);
    }

    @GetMapping(path = "/LeavesToNotCompleteBySupervisor/{empId}")
    public Iterable<Leaves> leaves(@PathVariable String empId) {
        return this.leavesRepository.getLeavesToNotCompleteBySupervisor(empId);
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

    @GetMapping(path = "/NotApproveBySup/{empID}")
    public Iterable<Leaves> NotApproveBySup(@PathVariable String empID) {
        return this.leavesRepository.getLeavesToNotApproveByManager(empID);
    }

    @GetMapping("/LeavesSelectDepartment/{empID}")
    public Iterable<Leaves> LeavesSelectDepartment(@PathVariable String empID) {
        return this.leavesRepository.getLeavesSelectDepartment(empID);
    }
    @GetMapping("/LeavesSelectDepartmentBySupervisor/{empID}")
    public Iterable<Leaves> LeavesSelectDepartmentBySupervisor(@PathVariable String empID) {
        return this.leavesRepository.getLeavesSelectDepartmentBySupervisor(empID);
    }
    @GetMapping("/getSearchEmployeeByCodeAndNameInApprove/{dataSearch}/{empID}")
    public Iterable<Leaves> searchEmployeeByCodeAndNameInApprove(@PathVariable String dataSearch,@PathVariable String empID){
        return this.leavesRepository.SearchEmployeeByCodeAndNameInApprove(dataSearch,empID);
    }
    @GetMapping("/getSearchEmployeeByCodeAndNameInApproveBySupervisor/{dataSearch}/{empID}")
    public Iterable<Leaves> searchEmployeeByCodeAndNameInApproveBySupervisor(@PathVariable String dataSearch,@PathVariable String empID){
        return this.leavesRepository.SearchEmployeeByCodeAndNameInApproveBySupervisor(dataSearch,empID);
    }
    @PostMapping("/Time/{startTime}/{endTime}")
    public String Time(@PathVariable String startTime , @PathVariable String endTime) throws ParseException {

        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        Date date1 = format.parse(startTime);
        Date date2 = format.parse(endTime);
        long difference = date2.getTime() - date1.getTime();
        long diffSeconds = difference / 1000 % 60;
        long diffMinutes = difference / (60 * 1000) % 60;
        long diffHours = difference / (60 * 60 * 1000) % 24;
        long diffDays = difference / (24 * 60 * 60 * 1000);

        String total = diffHours+"."+diffMinutes;
        return total;

    }
    @PostMapping("/SaveLeaveHalfDay/{leaID}/{leaveTypeSelect}/{labelLeaveHalfDay}/{startDate}/{reason}/{startTimeSelect}/{endTimeSelect}/{totalTime}/{statusLabelLeaveHalfDay}/{departmentIDLogin}/{leavesNumbersID}") // saveLeave ครึ่งวัน
    public Leaves leaves( @PathVariable Long leaID , @PathVariable String leaveTypeSelect,@PathVariable String labelLeaveHalfDay
            , @PathVariable Date startDate , @PathVariable String reason, @PathVariable String startTimeSelect
            , @PathVariable String endTimeSelect , @PathVariable float totalTime, @PathVariable int statusLabelLeaveHalfDay
            , @PathVariable long departmentIDLogin, @PathVariable long leavesNumbersID)  {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName(leaveTypeSelect);
        Department department = departmentRepository.findById(departmentIDLogin).get();
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findById(leavesNumbersID).get();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");
        Date date = new Date();
        Date time = new Date();
        String datetest = dateFormat.format(date);
        String datetest2 = dateFormat2.format(time);
        String[] arryA = datetest.split("-");
        int result = Integer.parseInt(arryA[2]);
        int arryA_3 = result-543;
        String datetrue = arryA[0]+"-"+arryA[1]+"-"+arryA_3+" "+datetest2;

        Leaves leaves1 = new Leaves();
        leaves1.setEmployeeMasterid(employeeMaster);
        leaves1.setCreateDate(datetrue);
        leaves1.setLeaveTypeForAllDay(leaveTypeForAllday);
        leaves1.setStartDateForAllDay(startDate);
        leaves1.setStartTime(startTimeSelect);
        leaves1.setEndTime(endTimeSelect);
        leaves1.setEndDateForAllDay(startDate);
        leaves1.setReasonForAllDay(reason);
        if(statusLabelLeaveHalfDay==1) leaves1.setLabelLeaveHalfDay(totalTime+" "+labelLeaveHalfDay);// x ชั่วโมง
        else leaves1.setLabelLeaveHalfDay(labelLeaveHalfDay);
        leaves1.setApprovedBySupervisor("Pending");
        leaves1.setApprovedByManager("Pending");
        leaves1.setConfirmByHR("Pending");
        leaves1.setIsActiveAttendance("1");
        leaves1.setLeaveStatus("Pending");
        leaves1.setDepartmentid(department);
        leaves1.setLeavesNumbersid(leavesNumbers);
        if(leavesNumbers.getBalanceDay()>0) leaves1.setIsPayment("payment");
        else leaves1.setIsPayment("not payment");
        leavesRepository.save(leaves1);
        return leaves1;
    }

    @PostMapping("/SaveLeaveFullDay/{leaID}/{leaveTypeSelect2}/{startDate2}/{endDate2}/{reason2}/{diffDay}/{leavesNumbersID}/{departmentIDLogin}") // saveLeave2 เต็มวัน
    public Leaves leaves2( @PathVariable Long leaID , @PathVariable String leaveTypeSelect2 ,@PathVariable Date startDate2
            , @PathVariable Date endDate2 , @PathVariable String reason2  , @PathVariable String diffDay, @PathVariable long leavesNumbersID
            , @PathVariable long departmentIDLogin) throws ParseException {

        EmployeeMaster employeeMaster = employeeMasterRepository.findById(leaID).get();
        LeaveTypeForAllday leaveTypeForAllday = leaveTypeForAlldayRepository.findByLeaveTypeForAlldayName(leaveTypeSelect2);
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findById(leavesNumbersID).get();
        Department department = departmentRepository.findById(departmentIDLogin).get();
        //DepartmentMasterRole departmentMasterRole = departmentMasterRoleRepository.findBy
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");
        Date date = new Date();
        Date time = new Date();
        String datetest = dateFormat.format(date);
        String datetest2 = dateFormat2.format(time);
        String[] arryA = datetest.split("-");
        int result = Integer.parseInt(arryA[2]);
        int arryA_3 = result-543;
        String datetrue = arryA[0]+"-"+arryA[1]+"-"+arryA_3+" "+datetest2;
        Leaves leaves2 = new Leaves();
        leaves2.setEmployeeMasterid(employeeMaster);
        leaves2.setCreateDate(datetrue);
        leaves2.setLeaveTypeForAllDay(leaveTypeForAllday);
        leaves2.setStartDateForAllDay(startDate2);
        leaves2.setEndDateForAllDay(endDate2);
        leaves2.setStartTime("08:00");
        leaves2.setEndTime("17:00");
        leaves2.setReasonForAllDay(reason2);
        leaves2.setLabelLeaveHalfDay(diffDay + " ว ัน");
        leaves2.setApprovedBySupervisor("Pending");
        leaves2.setApprovedByManager("Pending");
        leaves2.setConfirmByHR("Pending");
        leaves2.setIsActiveAttendance("1");
        leaves2.setLeaveStatus("Pending");
        leaves2.setLeavesNumbersid(leavesNumbers);
        leaves2.setDepartmentid(department);
        if(leavesNumbers.getBalanceDay()>0) leaves2.setIsPayment("payment");
        else leaves2.setIsPayment("not payment");

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

    @PostMapping(path = "/CancelLeave/{leavesID}") //Delete Leave
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
        approveBySupervisor.setLeaveStatus("Waiting approve"); //รอ ger approve
        leavesRepository.save(approveBySupervisor);
        return approveBySupervisor;
    }
    @PostMapping("/notApproveBySupervisor/{leavesID}/{reasonNotapprove}") // not ApproveBySupervisor
    public Leaves notApproveBySupervisor( @PathVariable Long leavesID, @PathVariable String reasonNotapprove){
        Leaves notApproveBySupervisor = leavesRepository.findById(leavesID).get();
        notApproveBySupervisor.setApprovedBySupervisor("Not approve");
        notApproveBySupervisor.setLeaveStatus("Not approve");
        notApproveBySupervisor.setReasonNotApprove(reasonNotapprove);
        leavesRepository.save(notApproveBySupervisor);
        return notApproveBySupervisor;
    }
    @PostMapping("/approveByManager/{leavesID}/{firstNameOnLogin}/{lastNameOnLogin}") // approveByManager
    public Leaves approveByManager( @PathVariable Long leavesID,@PathVariable String firstNameOnLogin,@PathVariable String lastNameOnLogin){
        Leaves approveByManager = leavesRepository.findById(leavesID).get();
        String name = firstNameOnLogin +"  "+ lastNameOnLogin;
        approveByManager.setApprovedByManager(name);
        approveByManager.setLeaveStatus("Approve");
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

    @PostMapping("/confirmByHR/{leavesID}/{isPayments}/{fName}/{lName}/{paymentReson}")
    public Leaves confirmByHR( @PathVariable Long leavesID,@PathVariable String isPayments,@PathVariable String fName
                                ,@PathVariable String lName,@PathVariable String paymentReson){
        Leaves confirmByHR = leavesRepository.findById(leavesID).get();
        confirmByHR.setLeaveStatus("Complete");
        confirmByHR.setConfirmByHR(fName+" "+lName);
        confirmByHR.setIsPayment(isPayments);
        confirmByHR.setPaymentReson(paymentReson);
        leavesRepository.save(confirmByHR);
        return confirmByHR;
    }

    @GetMapping("/SearchEmployeeByCodeAndName/{empCode}")
    public Iterable<Leaves> searchEmployeeByCodeAndName(@PathVariable String empCode){
        return this.leavesRepository.SearchEmployeeByCodeAndName(empCode);
    }
    @GetMapping("/SearchEmployeeByCodeAndName2/{empCode}")
    public Iterable<Leaves> searchEmployeeByCodeAndName2(@PathVariable String empCode){
        return this.leavesRepository.SearchEmployeeByCodeAndName2(empCode);
    }
    @GetMapping("/SearchEmployeeByDepartmentID/{departmentID}")
    public Iterable<Leaves> SearchEmployeeByDepartmentID(@PathVariable String departmentID){
        return this.leavesRepository.SearchEmployeeByDepartmentID(departmentID);
    }
    @GetMapping("/SearchEmployeeByDepartmentID2/{departmentID}")
    public Iterable<Leaves> SearchEmployeeByDepartmentID2(@PathVariable String departmentID){
        return this.leavesRepository.SearchEmployeeByDepartmentID2(departmentID);
    }

    @GetMapping("/SearchEmployeeByCodeAndNameInApproveBySup/{dataSearch}/{empID}")
    public Iterable<Leaves> SearchEmployeeByCodeAndNameInApproveBySup(@PathVariable String dataSearch,@PathVariable String empID){
        return this.leavesRepository.SearchEmployeeByCodeAndNameInApproveBySup(dataSearch,empID);
    }

    @GetMapping("/SearchEmployeeByCodeAndNameInApproveByManager/{dataSearch}/{empID}")
    public Iterable<Leaves> SearchEmployeeByCodeAndNameInApproveByManager(@PathVariable String dataSearch,@PathVariable String empID){
        return this.leavesRepository.SearchEmployeeByCodeAndNameInApproveByManager(dataSearch,empID);
    }

    @GetMapping("/getLeaveAtManager")
    public Iterable<Leaves> getLeaveAtManager(){
        return this.leavesRepository.getLeaveAtManager();
    }
    @GetMapping("/SearchLeaveAtManager/{dataSearch}")
    public Iterable<Leaves> SearchLeaveAtManager(@PathVariable String dataSearch){
        return this.leavesRepository.SearchLeaveAtManager(dataSearch);
    }

}
