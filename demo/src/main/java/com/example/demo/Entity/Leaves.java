package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Entity
@Table(name = "Leaves")
public class Leaves {
    @Id
    @SequenceGenerator(name = "Leaves3_seq", sequenceName = "Leaves3_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="Leaves3_seq")
    private long leavesID;
    private Date leavesDate;
    private String reason; // เหตุผล
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    private Date endDate;
    private String startTime;
    private String endTime;
    private String approvedBySupervisor;
    private String approvedByManager;
    private String isActiveAttendance;
    private String leaveType;
    @ManyToOne private EmployeeMaster employeeMasterid;
    private Date updateLeave_date;
    private String updateLeave_by;
    private String createLeave_by;
    private String leaveStatus;

    public String getLeaveStatus() {
        return leaveStatus;
    }

    public void setLeaveStatus(String leaveStatus) {
        this.leaveStatus = leaveStatus;
    }

    public Date getUpdateLeave_date() {
        return updateLeave_date;
    }

    public void setUpdateLeave_date(Date updateLeave_date) {
        this.updateLeave_date = updateLeave_date;
    }

    public String getUpdateLeave_by() {
        return updateLeave_by;
    }

    public void setUpdateLeave_by(String updateLeave_by) {
        this.updateLeave_by = updateLeave_by;
    }

    public String getCreateLeave_by() {
        return createLeave_by;
    }

    public void setCreateLeave_by(String createLeave_by) {
        this.createLeave_by = createLeave_by;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public long getLeavesID() {
        return leavesID;
    }

    public void setLeavesID(long leavesID) {
        this.leavesID = leavesID;
    }

    public Date getLeavesDate() {
        return leavesDate;
    }

    public void setLeavesDate(Date leavesDate) {
        this.leavesDate = leavesDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getApprovedBySupervisor() {
        return approvedBySupervisor;
    }

    public void setApprovedBySupervisor(String approvedBySupervisor) {
        this.approvedBySupervisor = approvedBySupervisor;
    }

    public String getApprovedByManager() {
        return approvedByManager;
    }

    public void setApprovedByManager(String approvedByManager) {
        this.approvedByManager = approvedByManager;
    }

    public String getIsActiveAttendance() {
        return isActiveAttendance;
    }

    public void setIsActiveAttendance(String isActiveAttendance) {
        this.isActiveAttendance = isActiveAttendance;
    }

    public EmployeeMaster getEmployeeMasterid() {
        return employeeMasterid;
    }

    public void setEmployeeMasterid(EmployeeMaster employeeMasterid) {
        this.employeeMasterid = employeeMasterid;
    }


}
