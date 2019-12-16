package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Entity
@Table(name = "LeavesNumbers")
public class LeavesNumbers {
    @Id
    @SequenceGenerator(name = "LeavesNumbers_seq", sequenceName = "LeavesNumbers_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="LeavesNumbers_seq")
    private long leavesNumbersID;

    private int  totalAnnualLeave; // ลาพักร้อนคงเหลือ วัน/ปี
    private int  sumAnnualLeave;
    private int  totalSickLeave; // ลาป่วยคงเหลือ วัน/ปี
    private int  sumSickLeave;
    private int  totalOthersLeave;
    private int  sumOthersLeave;
    private int  sumAllLeave;
    @ManyToOne private EmployeeMaster employeeMasterid;


    public int getSumAnnualLeave() {
        return sumAnnualLeave;
    }

    public void setSumAnnualLeave(int sumAnnualLeave) {
        this.sumAnnualLeave = sumAnnualLeave;
    }

    public int getSumSickLeave() {
        return sumSickLeave;
    }

    public void setSumSickLeave(int sumSickLeave) {
        this.sumSickLeave = sumSickLeave;
    }

    public int getSumOthersLeave() {
        return sumOthersLeave;
    }

    public void setSumOthersLeave(int sumOthersLeave) {
        this.sumOthersLeave = sumOthersLeave;
    }

    public EmployeeMaster getEmployeeMasterid() {
        return employeeMasterid;
    }

    public void setEmployeeMasterid(EmployeeMaster employeeMasterid) {
        this.employeeMasterid = employeeMasterid;
    }

    public long getLeavesNumbersID() {
        return leavesNumbersID;
    }

    public void setLeavesNumbersID(long leavesNumbersID) {
        this.leavesNumbersID = leavesNumbersID;
    }

    public int getTotalAnnualLeave() {
        return totalAnnualLeave;
    }

    public void setTotalAnnualLeave(int totalAnnualLeave) {
        this.totalAnnualLeave = totalAnnualLeave;
    }

    public int getTotalSickLeave() {
        return totalSickLeave;
    }

    public void setTotalSickLeave(int totalSickLeave) {
        this.totalSickLeave = totalSickLeave;
    }

    public int getTotalOthersLeave() {
        return totalOthersLeave;
    }

    public void setTotalOthersLeave(int totalOthersLeave) {
        this.totalOthersLeave = totalOthersLeave;
    }

    public int getSumAllLeave() {
        return sumAllLeave;
    }

    public void setSumAllLeave(int sumAllLeave) {
        this.sumAllLeave = sumAllLeave;
    }


}
