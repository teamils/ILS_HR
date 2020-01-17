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
    @Query(value = "SELECT * FROM leaves WHERE   is_active_attendance='1' and leave_status='Approve'" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotComplete();

    //approveBySupervisor //เห็นตาม master department role // ตอนไม่กด Complete
    @Query(value = "select * from leaves l,department d\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Pending'\n" +
            "and l.is_active_attendance=1\n" +
            "and l.departmentid in ( \n" +
            "\tselect distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "\twhere e.employee_masterid=1\n" +
            "\tand e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotCompleteBySupervisor(@Param("empID") String empID );

    // approveByManager //เห็นตาม master department role // ตอนไม่กด Complete
    @Query(value = "select * from leaves l,department d\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Waiting approve' and l.approved_by_supervisor <> 'Pending'\n" +
            "and l.is_active_attendance=1\n" +
            "and l.departmentid in ( \n" +
            "\tselect distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "\twhere e.employee_masterid=1\n" +
            "\tand e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotApproveByManager(@Param("empID2") String empID2 );

    //approveBySupervisor and approveByManager ลูกน้องตัวเอง//get leaves ที่ department=x   // ตกนกด Complete
    @Query(value = "select * from leaves l,department d\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Approve' \n" +
            "and l.is_active_attendance=1\n" +
            "and l.departmentid in ( \n" +
            "\tselect distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "\twhere e.employee_masterid=:empID3\n" +
            "\tand e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> getLeavesSelectDepartment(@Param("empID3") String empID3 );

    //Data Attendance ค้นหา รหัสพนักงาน ชื่อ - สกุล
    @Query(value = "select * from leaves,employee_master where (employee_master_customer_code LIKE %:empCode% or employee_master_first_name like %:empCode% or employee_master_last_name like %:empCode%) and leaves.employee_masterid_employee_masterid = employee_master.employee_masterid " +
            "and leaves.leave_status = 'Approve'",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByCodeAndName(@Param("empCode") String empCode );

    //Data Attendance ค้นหา By departmentID
    @Query(value = "select * from leaves l,employee_master e\n" +
            "where l.departmentid = :departmentID\n" +
            "and l.leave_status = 'Approve'\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByDepartmentID(@Param("departmentID") String departmentID );

    //Approve By Supervisor ค้นหา รหัสพนักงาน ชื่อ - สกุล
    @Query(value = "select * from leaves l,department d, employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Pending'\n" +
            "and l.is_active_attendance=1\n" +
            "and (e.employee_master_customer_code LIKE %:dataSearch% or e.employee_master_first_name LIKE %:dataSearch% or e.employee_master_last_name LIKE %:dataSearch% or d.department_name LIKE %:dataSearch%)\n" +
            "and e.employee_masterid = l.employee_masterid_employee_masterid\n" +
            "and l.departmentid in ( \n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid=1\n" +
            "and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByCodeAndNameInApproveBySup(@Param("dataSearch") String dataSearch );

    //Approve By Manager ค้นหา รหัสพนักงาน ชื่อ - สกุล
    @Query(value = "select * from leaves l,department d, employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Waiting approve' and l.approved_by_supervisor <> 'Pending'" +
            "and l.is_active_attendance=1\n" +
            "and (e.employee_master_customer_code LIKE %:dataSearch% or e.employee_master_first_name LIKE %:dataSearch% or e.employee_master_last_name LIKE %:dataSearch% or d.department_name LIKE %:dataSearch%)\n" +
            "and e.employee_masterid = l.employee_masterid_employee_masterid\n" +
            "and l.departmentid in ( \n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid=1\n" +
            "and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> SearchEmployeeByCodeAndNameInApproveByManager(@Param("dataSearch") String dataSearch );

}
