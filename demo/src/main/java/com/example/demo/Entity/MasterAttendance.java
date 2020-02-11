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
public class MasterAttendance {
    @Id
    @SequenceGenerator(name = "MasterAttendance_seq", sequenceName = "MasterAttendance_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="MasterAttendance_seq")
    private Long MasterAttendanceID;
    private int year;
    private int dayLeave;
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

    public Long getMasterAttendanceID() {
        return MasterAttendanceID;
    }

    public void setMasterAttendanceID(Long masterAttendanceID) {
        MasterAttendanceID = masterAttendanceID;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getDayLeave() {
        return dayLeave;
    }

    public void setDayLeave(int dayLeave) {
        this.dayLeave = dayLeave;
    }
}
