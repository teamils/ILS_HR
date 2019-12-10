package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "RoleStatus")
public class RoleStatus {
    @Id
    @SequenceGenerator(name = "RoleStatus_seq", sequenceName = "RoleStatus_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RoleStatus_seq")
    private long RoleStatusID;
    private String RoleStatusName;
    private String RoleStatusAbbreviation;

    public long getRoleStatusID() {
        return RoleStatusID;
    }

    public void setRoleStatusID(long roleStatusID) {
        RoleStatusID = roleStatusID;
    }

    public String getRoleStatusName() {
        return RoleStatusName;
    }

    public void setRoleStatusName(String roleStatusName) {
        RoleStatusName = roleStatusName;
    }

    public String getRoleStatusAbbreviation() {
        return RoleStatusAbbreviation;
    }

    public void setRoleStatusAbbreviation(String roleStatusAbbreviation) {
        RoleStatusAbbreviation = roleStatusAbbreviation;
    }


}
