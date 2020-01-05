package com.example.demo.Entity.Combobox;
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
public class LeaveTypeForAllday {
    @Id
    private Long leaveTypeForAlldayID;
    private String leaveTypeForAlldayName;
    private int defaultLeaveDay;

    public int getDefaultLeaveDay() {
        return defaultLeaveDay;
    }

    public void setDefaultLeaveDay(int defaultLeaveDay) {
        this.defaultLeaveDay = defaultLeaveDay;
    }

    public Long getLeaveTypeForAlldayID() {
        return leaveTypeForAlldayID;
    }

    public void setLeaveTypeForAlldayID(Long leaveTypeForAlldayID) {
        this.leaveTypeForAlldayID = leaveTypeForAlldayID;
    }

    public String getLeaveTypeForAlldayName() {
        return leaveTypeForAlldayName;
    }

    public void setLeaveTypeForAlldayName(String leaveTypeForAlldayName) {
        this.leaveTypeForAlldayName = leaveTypeForAlldayName;
    }
}
