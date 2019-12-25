package com.example.demo.Entity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class LeaveType {
    @Id
    @SequenceGenerator(name = "LeaveType_seq1", sequenceName = "LeaveType_seq1",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LeaveType_seq1")
    private Long leaveTypeID;
    private String leaveTypeName;

    public long getLeaveTypeID() {
        return leaveTypeID;
    }

    public void setLeaveTypeID(long leaveTypeID) {
        this.leaveTypeID = leaveTypeID;
    }

    public String getLeaveTypeName() {
        return leaveTypeName;
    }

    public void setLeaveTypeName(String leaveTypeName) {
        this.leaveTypeName = leaveTypeName;
    }



}
