package com.example.demo.Repository;
import com.example.demo.Entity.*;
import com.example.demo.Entity.Combobox.Department;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

@Repository
public interface LeavesRepository extends JpaRepository<Leaves,Long>{
    Leaves findByemployeeMasterid(EmployeeMaster employeeMasterid);

    //getLeaves 1คน //show ของ user นั้นๆ
    @Query(value = "SELECT * FROM leaves WHERE employee_masterid_employee_masterid = :employeeCode2 and is_active_attendance='1' ",nativeQuery = true)
    Collection<Leaves> getLeaves2(@Param("employeeCode2") String employeeCode2 );

    //date attendance // ตกนกด Complete
    @Query(value = "SELECT * FROM leaves WHERE   is_active_attendance='1' and leave_status='Complete'" ,nativeQuery = true)
    Collection<Leaves> getLeavesToComplete();

    //date attendance // ตกนไม่กด Complete
    @Query(value = "SELECT * FROM leaves WHERE   is_active_attendance='1' and leave_status<>'Complete'" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotComplete();

    //approveBySupervisor // ตอนไม่กด Complete
    @Query(value = "SELECT * FROM leaves,employee_master WHERE is_active_attendance='1' and employee_department=:department3 and leave_status <>'Approve' and leave_status <>'Cancel' and leaves.employee_masterid_employee_masterid=employee_master.employee_masterid" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotCompleteBySupervisor(@Param("department3") String department3 );

    // approveByManager ลูกน้องตัวเอง // ตอนไม่กด Complete
    @Query(value = "SELECT *FROM leaves,employee_master WHERE is_active_attendance='1' and employee_department='IT' and leave_status <>'Approve' and leave_status <>'Cancel' and (APPROVED_BY_SUPERVISOR <>'Not  approve' and  leave_status <>'Not approve') and leaves.employee_masterid_employee_masterid=employee_master.employee_masterid" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotApproveByManager(@Param("department2") String department2 );

    //approveBySupervisor and approveByManager ลูกน้องตัวเอง//get leaves ที่ department=x   // ตกนกด Complete
    @Query(value = "SELECT * FROM leaves,employee_master WHERE is_active_attendance='1' and employee_department=:department  and leave_status='Approve' and leaves.employee_masterid_employee_masterid=employee_master.employee_masterid",nativeQuery = true)
    Collection<Leaves> getLeavesSelectDepartment(@Param("department") String department );

    //Data Attendance ค้นหา รหัสพนักงาน ชื่อ - สกุล
    @Query(value = "select * from leaves,employee_master where (employee_master_customer_code LIKE %:empCode% or employee_master_first_name like %:empCode% or employee_master_last_name like %:empCode%) and leaves.employee_masterid_employee_masterid = employee_master.employee_masterid",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByCodeAndName(@Param("empCode") String empCode );

    //Data Attendance ค้นหา By departmentID
    @Query(value = "select * from leaves,employee_master where employee_master.departmentid_departmentid=:departmentID and leaves.employee_masterid_employee_masterid = employee_master.employee_masterid",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByDepartmentID(@Param("departmentID") String departmentID );


}
