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
    private double defaultLeaveDay;
    private Date create_date;
    private String create_by;
    private Date update_date;
    private String update_by;

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getCreate_by() {
        return create_by;
    }

    public void setCreate_by(String create_by) {
        this.create_by = create_by;
    }

    public Date getUpdate_date() {
        return update_date;
    }

    public void setUpdate_date(Date update_date) {
        this.update_date = update_date;
    }

    public String getUpdate_by() {
        return update_by;
    }

    public void setUpdate_by(String update_by) {
        this.update_by = update_by;
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

    public double getDefaultLeaveDay() {
        return defaultLeaveDay;
    }

    public void setDefaultLeaveDay(double defaultLeaveDay) {
        this.defaultLeaveDay = defaultLeaveDay;
    }
}
