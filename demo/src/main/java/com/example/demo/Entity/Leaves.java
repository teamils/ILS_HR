package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.time.LocalDate;
import java.util.GregorianCalendar;

@Entity
@Table(name = "Leaves")

public class Leaves {
    @Id
    @SequenceGenerator(name = "Leaves3_seq", sequenceName = "Leaves3_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="Leaves3_seq")
    private long leavesID;
    @Temporal(TemporalType.DATE)
    private Date createDate;
    private Date updateLeave_date;
    private String updateLeave_by;
    private String createLeave_by;
    private String labelLeaveHalfDay;
    private String reasonForAllDay; // เหตุผล
    @Temporal(TemporalType.DATE)
    private Date startDateForAllDay;
    @Temporal(TemporalType.DATE)
    private Date endDateForAllDay;
    private String leaveTypeForAllDay;

    private String approvedBySupervisor;
    private String approvedByManager;
    private String isActiveAttendance;

    @ManyToOne private EmployeeMaster employeeMasterid;
    private String leaveStatus;

    public long getLeavesID() {
        return leavesID;
    }

    public void setLeavesID(long leavesID) {
        this.leavesID = leavesID;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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

    public String getLabelLeaveHalfDay() {
        return labelLeaveHalfDay;
    }

    public void setLabelLeaveHalfDay(String labelLeaveHalfDay) {
        this.labelLeaveHalfDay = labelLeaveHalfDay;
    }

    public String getReasonForAllDay() {
        return reasonForAllDay;
    }

    public void setReasonForAllDay(String reasonForAllDay) {
        this.reasonForAllDay = reasonForAllDay;
    }

    public Date getStartDateForAllDay() {
        return startDateForAllDay;
    }

    public void setStartDateForAllDay(Date startDateForAllDay) {
        this.startDateForAllDay = startDateForAllDay;
    }

    public Date getEndDateForAllDay() {
        return endDateForAllDay;
    }

    public void setEndDateForAllDay(Date endDateForAllDay) {
        this.endDateForAllDay = endDateForAllDay;
    }

    public String getLeaveTypeForAllDay() {
        return leaveTypeForAllDay;
    }

    public void setLeaveTypeForAllDay(String leaveTypeForAllDay) {
        this.leaveTypeForAllDay = leaveTypeForAllDay;
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

    public String getLeaveStatus() {
        return leaveStatus;
    }

    public void setLeaveStatus(String leaveStatus) {
        this.leaveStatus = leaveStatus;
    }




}
