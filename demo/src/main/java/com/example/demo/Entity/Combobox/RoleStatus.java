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
public class RoleStatus {
    @Id
    @SequenceGenerator(name = "RoleStatus_seq1", sequenceName = "RoleStatus_seq1",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RoleStatus_seq1")
    private Long RoleStatusID;
    private String RoleStatusName;
    private String RoleStatusAbbreviation;

    public Long getRoleStatusID() {
        return RoleStatusID;
    }

    public void setRoleStatusID(Long roleStatusID) {
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
