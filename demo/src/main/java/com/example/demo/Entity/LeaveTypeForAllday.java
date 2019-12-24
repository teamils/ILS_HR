package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "LeaveTypeForAllday")
public class LeaveTypeForAllday {
    @Id
    private long leaveTypeForAlldayID;
    private String leaveTypeForAlldayName;

    public long getLeaveTypeForAlldayID() {
        return leaveTypeForAlldayID;
    }

    public void setLeaveTypeForAlldayID(long leaveTypeForAlldayID) {
        this.leaveTypeForAlldayID = leaveTypeForAlldayID;
    }

    public String getLeaveTypeForAlldayName() {
        return leaveTypeForAlldayName;
    }

    public void setLeaveTypeForAlldayName(String leaveTypeForAlldayName) {
        this.leaveTypeForAlldayName = leaveTypeForAlldayName;
    }



}
