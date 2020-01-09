package com.example.demo.Entity;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
import lombok.*;

import javax.persistence.*;
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
    private Date create_Date;
    private Date update_Date;
    private String create_by;
    private String update_by;
    private double getDay; // วันได้รับ
    private double usedDay; //วันใช้ไป
    private double BalanceDay; // วันคงเหลือ
    private double CompoundDay; // ทบวัน
    private double diffDay; //จำนวนวันลา ณ การลา1ครั่ง

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

    public Date getCreate_Date() {
        return create_Date;
    }

    public void setCreate_Date(Date create_Date) {
        this.create_Date = create_Date;
    }

    public Date getUpdate_Date() {
        return update_Date;
    }

    public void setUpdate_Date(Date update_Date) {
        this.update_Date = update_Date;
    }

    public String getCreate_by() {
        return create_by;
    }

    public void setCreate_by(String create_by) {
        this.create_by = create_by;
    }

    public String getUpdate_by() {
        return update_by;
    }

    public void setUpdate_by(String update_by) {
        this.update_by = update_by;
    }

    public double getGetDay() {
        return getDay;
    }

    public void setGetDay(double getDay) {
        this.getDay = getDay;
    }

    public double getUsedDay() {
        return usedDay;
    }

    public void setUsedDay(double usedDay) {
        this.usedDay = usedDay;
    }

    public double getBalanceDay() {
        return BalanceDay;
    }

    public void setBalanceDay(double balanceDay) {
        BalanceDay = balanceDay;
    }

    public double getCompoundDay() {
        return CompoundDay;
    }

    public void setCompoundDay(double compoundDay) {
        CompoundDay = compoundDay;
    }

    public double getDiffDay() {
        return diffDay;
    }

    public void setDiffDay(double diffDay) {
        this.diffDay = diffDay;
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
