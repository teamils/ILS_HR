package com.example.demo.Entity;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class UserRole {
    @Id
    @SequenceGenerator(name = "UserRole_seq", sequenceName = "UserRole_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="UserRole_seq")
    private long id;

    @ManyToOne
    @JoinColumn(name = "empID", insertable = true)
    private EmployeeMaster empID;

    @ManyToOne
    @JoinColumn(name = "masterRoleID", insertable = true)
    private MasterRole masterRoleID;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public EmployeeMaster getEmpID() {
        return empID;
    }

    public void setEmpID(EmployeeMaster empID) {
        this.empID = empID;
    }

    public MasterRole getMasterRoleID() {
        return masterRoleID;
    }

    public void setMasterRoleID(MasterRole masterRoleID) {
        this.masterRoleID = masterRoleID;
    }
}
