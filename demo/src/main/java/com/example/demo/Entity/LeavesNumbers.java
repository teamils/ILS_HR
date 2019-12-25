package com.example.demo.Entity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class LeavesNumbers {
    @Id
    @SequenceGenerator(name = "LeavesNumbers_seq", sequenceName = "LeavesNumbers_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="LeavesNumbers_seq")
    private Long leavesNumbersID;
    private int getDay; // วันได้รับ
    private int usedDay; //วันใช้ไป
    private int BalanceDay; // วันคงเหลือ
    private int CompoundDay; // ทบวัน

    @ManyToOne
    @JoinColumn(name = "leaveTypeID", insertable = true)
    private LeaveTypeForAllday leaveTypeid;

    @ManyToOne
    @JoinColumn(name = "employeeMasterID", insertable = true)
     private EmployeeMaster employeeMasterid;

    public Long getLeavesNumbersID() {
        return leavesNumbersID;
    }

    public void setLeavesNumbersID(Long leavesNumbersID) {
        this.leavesNumbersID = leavesNumbersID;
    }

    public int getGetDay() {
        return getDay;
    }

    public void setGetDay(int getDay) {
        this.getDay = getDay;
    }

    public int getUsedDay() {
        return usedDay;
    }

    public void setUsedDay(int usedDay) {
        this.usedDay = usedDay;
    }

    public int getBalanceDay() {
        return BalanceDay;
    }

    public void setBalanceDay(int balanceDay) {
        BalanceDay = balanceDay;
    }

    public int getCompoundDay() {
        return CompoundDay;
    }

    public void setCompoundDay(int compoundDay) {
        CompoundDay = compoundDay;
    }

    public LeaveTypeForAllday getLeaveTypeid() {
        return leaveTypeid;
    }

    public void setLeaveTypeid(LeaveTypeForAllday leaveTypeid) {
        this.leaveTypeid = leaveTypeid;
    }

    public EmployeeMaster getEmployeeMasterid() {
        return employeeMasterid;
    }

    public void setEmployeeMasterid(EmployeeMaster employeeMasterid) {
        this.employeeMasterid = employeeMasterid;
    }
}
