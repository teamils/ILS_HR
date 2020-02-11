package com.example.demo.Entity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

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
