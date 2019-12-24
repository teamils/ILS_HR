package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "MasterAttendance")
public class MasterAttendance {
    @Id
    private long MasterAttendanceID;
    private int year;
    private int dayLeave;

    public long getMasterAttendanceID() {
        return MasterAttendanceID;
    }

    public void setMasterAttendanceID(long masterAttendanceID) {
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
