package com.example.demo.Entity.Combobox;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class EmpStatus {
    @Id
    @SequenceGenerator(name = "EmpStatus_seq", sequenceName = "EmpStatus_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EmpStatus_seq")
    private Long empStatusID;
    private String empStatusName;

    public Long getEmpStatusID() {
        return empStatusID;
    }

    public void setEmpStatusID(Long empStatusID) {
        this.empStatusID = empStatusID;
    }

    public String getEmpStatusName() {
        return empStatusName;
    }

    public void setEmpStatusName(String empStatusName) {
        this.empStatusName = empStatusName;
    }
}
