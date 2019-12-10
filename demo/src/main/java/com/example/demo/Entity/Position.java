package com.example.demo.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "Position")
public class Position {
    @Id
    @SequenceGenerator(name = "Position_seq", sequenceName = "Position_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Position_seq")
    private long positionID;
    private String positionName;

    public long getPositionID() {
        return positionID;
    }

    public void setPositionID(long positionID) {
        this.positionID = positionID;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }


}
