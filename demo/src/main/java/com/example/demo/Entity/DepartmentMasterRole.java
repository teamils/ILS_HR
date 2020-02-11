package com.example.demo.Entity;
import com.example.demo.Entity.Combobox.Department;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

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
