package com.example.demo.Entity;
import com.example.demo.Entity.Combobox.Department;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class DepartmentMasterRole {
    @Id
    @SequenceGenerator(name = "DepartmentMasterRole_seq", sequenceName = "DepartmentMasterRole_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator ="DepartmentMasterRole_seq")
    private Long departmentMasterRoleID;

    @ManyToOne
    @JoinColumn(name = "employeeMasterid", insertable = true)
    private EmployeeMaster employeeMasterid;

    @ManyToOne
    @JoinColumn(name = "departmentid", insertable = true)
    private Department departmentid;

    public Long getDepartmentMasterRoleID() {
        return departmentMasterRoleID;
    }

    public void setDepartmentMasterRoleID(Long departmentMasterRoleID) {
        this.departmentMasterRoleID = departmentMasterRoleID;
    }

    public EmployeeMaster getEmployeeMasterid() {
        return employeeMasterid;
    }

    public void setEmployeeMasterid(EmployeeMaster employeeMasterid) {
        this.employeeMasterid = employeeMasterid;
    }

    public Department getDepartmentid() {
        return departmentid;
    }

    public void setDepartmentid(Department departmentid) {
        this.departmentid = departmentid;
    }


}
