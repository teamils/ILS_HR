package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.example.demo.Repository.ComboboxRepository.LeaveTypeForAlldayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class LeavesNumbersController {
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private LeavesNumbersRepository leavesNumbersRepository;
    @Autowired private LeavesRepository leavesRepository;
    @Autowired private LeaveTypeForAlldayRepository leaveTypeForAlldayRepository;
    @Autowired private MasterAttendanceRepository masterAttendanceRepository;
     private LeavesNumbers leavesNumbers;

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

    @PostMapping("/UpdateLeaveNumber/{leavesNumbersID}/{diffDay}/{fName}/{lName}/{statusLabelLeaveHalfDay}/{leaveTypeForAllDayID}")
    public LeavesNumbers UpdateLeaveNumber( @PathVariable long leavesNumbersID,@PathVariable Double diffDay,@PathVariable String fName,
                                            @PathVariable String lName,@PathVariable int statusLabelLeaveHalfDay,@PathVariable long leaveTypeForAllDayID){
        LeavesNumbers leavesNumbers = leavesNumbersRepository.findById(leavesNumbersID).get();
        if(statusLabelLeaveHalfDay==3){
            leavesNumbers.setUsedDay(leavesNumbers.getUsedDay()+0.5);
            leavesNumbers.setBalanceDay(leavesNumbers.getBalanceDay()-0.5);
            leavesNumbers.setDiffDay(0.5);
        }
        else if(statusLabelLeaveHalfDay==2){
            //int result = Integer.parseInt(diffDay);
            leavesNumbers.setUsedDay(leavesNumbers.getUsedDay()+diffDay);
            leavesNumbers.setBalanceDay(leavesNumbers.getBalanceDay()-diffDay);
            leavesNumbers.setDiffDay(diffDay);
        }
        else if(statusLabelLeaveHalfDay==1){
            //double result2 = Double.parseDouble(diffDay);
            //BigDecimal bd = new BigDecimal(result2).setScale(2, RoundingMode.HALF_UP);
            //double newresult2 = bd.doubleValue();
            diffDay = (diffDay*0.5)/4;
            leavesNumbers.setUsedDay(leavesNumbers.getUsedDay()+diffDay);
            leavesNumbers.setBalanceDay(leavesNumbers.getBalanceDay()-diffDay);
            leavesNumbers.setDiffDay(diffDay);
        }
        if(leaveTypeForAllDayID==3){
            leavesNumbers.setCompoundDay(leavesNumbers.getBalanceDay());
        }
        leavesNumbers.setUpdate_Date(new Date());
        leavesNumbers.setUpdate_by(fName+" "+lName);
        leavesNumbersRepository.save(leavesNumbers);

        return leavesNumbers;
    }

    @PostMapping("/CalculateLeaveNumberBack/{leavesNumbersID}/{diffDay}/{leavesID}")
    public Leaves calculateLeaveNumberBack(@PathVariable long leavesNumbersID, @PathVariable double diffDay , @PathVariable long leavesID ){
        Leaves leaves = leavesRepository.findById(leavesID).get();
        LeavesNumbers calculateLeaveNumberBack = leavesNumbersRepository.findById(leavesNumbersID).get();
            calculateLeaveNumberBack.setUsedDay(calculateLeaveNumberBack.getUsedDay()-diffDay);
            calculateLeaveNumberBack.setDiffDay(calculateLeaveNumberBack.getDiffDay()-diffDay);
            calculateLeaveNumberBack.setBalanceDay(calculateLeaveNumberBack.getBalanceDay()+diffDay);
            if(calculateLeaveNumberBack.getCompoundDay()!=0){
                calculateLeaveNumberBack.setCompoundDay(calculateLeaveNumberBack.getCompoundDay()+diffDay);
            }
        leaves.setIsPayment("not payment");
        leavesRepository.save(leaves);
        return leaves;
    }

    @PostMapping("/CalculateLeaveNumberBack2/{leavesNumbersID}/{diffDay}/{leavesID}")
    public Leaves CalculateLeaveNumberBack2(@PathVariable long leavesNumbersID, @PathVariable double diffDay , @PathVariable long leavesID ){
        Leaves leaves = leavesRepository.findById(leavesID).get();
        LeavesNumbers calculateLeaveNumberBack = leavesNumbersRepository.findById(leavesNumbersID).get();
        calculateLeaveNumberBack.setUsedDay(calculateLeaveNumberBack.getUsedDay()-diffDay);
        calculateLeaveNumberBack.setDiffDay(calculateLeaveNumberBack.getDiffDay()-diffDay);
        calculateLeaveNumberBack.setBalanceDay(calculateLeaveNumberBack.getBalanceDay()+diffDay);
        if(calculateLeaveNumberBack.getCompoundDay()!=0){
            calculateLeaveNumberBack.setCompoundDay(calculateLeaveNumberBack.getCompoundDay()+diffDay);
        }
        leaves.setIsPayment("not payment");
        leaves.setLeaveStatus("Complete");
        leavesRepository.save(leaves);
        return leaves;
    }

    @PostMapping("/CalculateLeaveNumberBack3/{leavesNumbersID}/{diffDay}/{leavesID}")
    public Leaves CalculateLeaveNumberBack3(@PathVariable long leavesNumbersID, @PathVariable double diffDay , @PathVariable long leavesID ){
        Leaves leaves = leavesRepository.findById(leavesID).get();
        LeavesNumbers calculateLeaveNumberBack = leavesNumbersRepository.findById(leavesNumbersID).get();
        calculateLeaveNumberBack.setUsedDay(calculateLeaveNumberBack.getUsedDay()-diffDay);
        calculateLeaveNumberBack.setDiffDay(calculateLeaveNumberBack.getDiffDay()-diffDay);
        calculateLeaveNumberBack.setBalanceDay(calculateLeaveNumberBack.getBalanceDay()+diffDay);
        if(calculateLeaveNumberBack.getCompoundDay()!=0){
            calculateLeaveNumberBack.setCompoundDay(calculateLeaveNumberBack.getCompoundDay()+diffDay);
        }
        leaves.setIsPayment("not payment");
        leaves.setLeaveStatus("Cancel");
        leavesRepository.save(leaves);
        return leaves;
    }

    @Scheduled(fixedRate = 1000)
    public void updateLeaveNumberToNextYear() {
        LocalDateTime date = LocalDateTime.now();
        //System.out.println(date);
        int day = date.getDayOfMonth();
        int month = date.getMonthValue();
        int year = date.getYear();
        int hour = date.getHour();
        int minute = date.getMinute();
        int second = date.getSecond();
        //System.out.println(day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second);

        int dayReset = 1;
        int monthReset = 1;
        int hourReset = 0;
        int minuteReset = 1;
        int secondReset = 0;

        if (day == dayReset && month == monthReset && hour == hourReset && minute == minuteReset && second == secondReset++) {
            long id = 1;
            LeaveTypeForAllday leaveTypeForAllday1 = leaveTypeForAlldayRepository.findById(id).get();
            leavesNumbersRepository.resetleaveNumber1(leaveTypeForAllday1.getDefaultLeaveDay());// ลากิจ , ลาไปงานศพ
        }
        if (day == dayReset && month == monthReset && hour == hourReset && minute == minuteReset && second == secondReset++) {
            long id = 5;
            LeaveTypeForAllday leaveTypeForAllday5 = leaveTypeForAlldayRepository.findById(id).get();
            leavesNumbersRepository.resetleaveNumber5(leaveTypeForAllday5.getDefaultLeaveDay());// ลาป่วย
        }
        if (day == dayReset && month == monthReset && hour == hourReset && minute == minuteReset && second == secondReset++) {
            long id = 2;
            LeaveTypeForAllday leaveTypeForAllday2 = leaveTypeForAlldayRepository.findById(id).get();
            leavesNumbersRepository.resetleaveNumber2(leaveTypeForAllday2.getDefaultLeaveDay());// ลาป่วย
        }
        if (day == dayReset && month == monthReset && hour == hourReset && minute == minuteReset && second == secondReset++) {
            long id = 8;
            LeaveTypeForAllday leaveTypeForAllday8 = leaveTypeForAlldayRepository.findById(id).get();
            leavesNumbersRepository.resetleaveNumber8(leaveTypeForAllday8.getDefaultLeaveDay());// ลาคลอด
        }

        List<LeavesNumbers> leavesNumbersList = leavesNumbersRepository.findAll().stream()
                .filter(this::getleaveType)
                .collect(Collectors.toList());
        LeavesNumbers[] itemsArray = new LeavesNumbers[leavesNumbersList.size()];
        itemsArray = leavesNumbersList.toArray(itemsArray);
        double balanceDay;
        for (int i = 0; i < itemsArray.length; i++) {
            balanceDay = itemsArray[i].getGetDay() + itemsArray[i].getCompoundDay();

            if (day == dayReset && month == monthReset && hour == hourReset && minute == minuteReset && second == secondReset++) {
                leavesNumbersRepository.resetleaveNumber3InJanuary(itemsArray[i].getGetDay(), balanceDay, itemsArray[i].getEmployeeMasterid().getEmployeeMasterID());
            }
            else if(day == 1 && month == 4 && hour == 0 && minute == 1 && second == secondReset++){
                if(itemsArray[i].getBalanceDay() < itemsArray[i].getGetDay()){
                    leavesNumbersRepository.resetleaveNumber3InJanuary(itemsArray[i].getGetDay(), itemsArray[i].getBalanceDay(), itemsArray[i].getEmployeeMasterid().getEmployeeMasterID());
                }
                else{
                    leavesNumbersRepository.resetleaveNumber3InJanuary(itemsArray[i].getGetDay(), itemsArray[i].getGetDay(), itemsArray[i].getEmployeeMasterid().getEmployeeMasterID());
                }
            }
            if(secondReset >= 60){
                secondReset = secondReset/60;
                minuteReset++;
            }
        }
    }

    private boolean getleaveType(LeavesNumbers leavesNumbers) {
        return leavesNumbers.getLeaveTypeid().getLeaveTypeForAlldayName().equals("ลาพักร้อน");
    }

}
