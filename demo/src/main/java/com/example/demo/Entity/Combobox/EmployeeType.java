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
public class EmployeeType {
    @Id
    @SequenceGenerator(name = "EmployeeType_seq", sequenceName = "EmployeeType_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EmployeeType_seq")
    private Long employeeTypeID;
    private String employeeTypeName;

    public Long getEmployeeTypeID() {
        return employeeTypeID;
    }

    public void setEmployeeTypeID(Long employeeTypeID) {
        this.employeeTypeID = employeeTypeID;
    }

    public String getEmployeeTypeName() {
        return employeeTypeName;
    }

    public void setEmployeeTypeName(String employeeTypeName) {
        this.employeeTypeName = employeeTypeName;
    }
}
