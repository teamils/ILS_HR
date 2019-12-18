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
    private Date createDate;
    private Date updateLeave_date;
    private String updateLeave_by;
    private String createLeave_by;

    private String reasonForHalfDay; // เหตุผล
    @Temporal(TemporalType.DATE)
    private Date startDateForHalfDay;
    @Temporal(TemporalType.DATE)
    private Date endDateForHalfDay;
    private String startTimeForHalfDay;
    private String endTimeForHalfDay;
    private String leaveTypeForHalfDay;
    private String labelLeaveHalfDay;

    private String reasonForAllDay; // เหตุผล
    @Temporal(TemporalType.DATE)
    private Date startDateForAllDay;
    @Temporal(TemporalType.DATE)
    private Date endDateForAllDay;
    private String startTimeForAllDay;
    private String endTimeForAllDay;
    private String leaveTypeForAllDay;

    private String approvedBySupervisor;
    private String approvedByManager;
    private String isActiveAttendance;
    @ManyToOne private EmployeeMaster employeeMasterid;
    private String leaveStatus;

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

    public String getStartTimeForAllDay() {
        return startTimeForAllDay;
    }

    public void setStartTimeForAllDay(String startTimeForAllDay) {
        this.startTimeForAllDay = startTimeForAllDay;
    }

    public String getEndTimeForAllDay() {
        return endTimeForAllDay;
    }

    public void setEndTimeForAllDay(String endTimeForAllDay) {
        this.endTimeForAllDay = endTimeForAllDay;
    }

    public String getLeaveTypeForHalfDay() {
        return leaveTypeForHalfDay;
    }

    public void setLeaveTypeForHalfDay(String leaveTypeForHalfDay) {
        this.leaveTypeForHalfDay = leaveTypeForHalfDay;
    }

    public String getLeaveTypeForAllDay() {
        return leaveTypeForAllDay;
    }

    public void setLeaveTypeForAllDay(String leaveTypeForAllDay) {
        this.leaveTypeForAllDay = leaveTypeForAllDay;
    }

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
        return leaveTypeForHalfDay;
    }

    public void setLeaveType(String leaveType) {
        this.leaveTypeForHalfDay = leaveType;
    }

    public Date getStartDateForHalfDay() {
        return startDateForHalfDay;
    }

    public void setStartDateForHalfDay(Date startDateForHalfDay) {
        this.startDateForHalfDay = startDateForHalfDay;
    }

    public String getStartTimeForHalfDay() {
        return startTimeForHalfDay;
    }

    public void setStartTimeForHalfDay(String startTimeForHalfDay) {
        this.startTimeForHalfDay = startTimeForHalfDay;
    }

    public String getEndTimeForHalfDay() {
        return endTimeForHalfDay;
    }

    public void setEndTimeForHalfDay(String endTimeForHalfDay) {
        this.endTimeForHalfDay = endTimeForHalfDay;
    }

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

    public String getReasonForHalfDay() {
        return reasonForHalfDay;
    }

    public void setReasonForHalfDay(String reasonForHalfDay) {
        this.reasonForHalfDay = reasonForHalfDay;
    }

    public Date getEndDateForHalfDay() {
        return endDateForHalfDay;
    }

    public void setEndDateForHalfDay(Date endDateForHalfDay) {
        this.endDateForHalfDay = endDateForHalfDay;
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
