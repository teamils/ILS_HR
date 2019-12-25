package com.example.demo.Entity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Calendar;
import java.util.Date;
import java.time.LocalDate;
import java.util.GregorianCalendar;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Leaves {
    @Id
    @SequenceGenerator(name = "Leaves3_seq", sequenceName = "Leaves3_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="Leaves3_seq")
    private long leavesID;


    private String createDate;

    private Date updateLeave_date;
    private String updateLeave_by;
    private String createLeave_by;
    private String labelLeaveHalfDay;
    private String reasonForAllDay; // เหตุผล
    @Temporal(TemporalType.DATE)
    private Date startDateForAllDay;
    @Temporal(TemporalType.DATE)
    private Date endDateForAllDay;
    private String startTime;
    private String endTime;
    private String leaveTypeForAllDay;

    private String approvedBySupervisor;
    private String approvedByManager;
    private String isActiveAttendance;

    @ManyToOne private EmployeeMaster employeeMasterid;
    private String leaveStatus;
    private String reasonNotApprove;

    public long getLeavesID() {
        return leavesID;
    }

    public void setLeavesID(long leavesID) {
        this.leavesID = leavesID;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
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

    public String getReasonNotApprove() {
        return reasonNotApprove;
    }

    public void setReasonNotApprove(String reasonNotApprove) {
        this.reasonNotApprove = reasonNotApprove;
    }
}
