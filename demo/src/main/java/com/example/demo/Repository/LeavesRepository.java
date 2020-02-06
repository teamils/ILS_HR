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
//***********************************************  date attendance *******************************************//
    //getLeaves 1คน //show ของ user นั้นๆ
    @Query(value = "SELECT * FROM leaves WHERE employee_masterid_employee_masterid = :employeeCode2 and is_active_attendance='1' ",nativeQuery = true)
    Collection<Leaves> getLeaves2(@Param("employeeCode2") String employeeCode2 );

    //Search leave by leaveType and leaveStatus
    @Query(value = "SELECT * FROM leaves l\n" +
            "WHERE l.leave_type_for_all_day_leave_type_for_alldayid like :leaveType% \n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and l.is_active_attendance=1 \n" +
            "and l.employee_masterid_employee_masterid = :empID",nativeQuery = true)
    Collection<Leaves> Search_Leave_by_leaveType_and_leaveStatus(@Param("leaveType") String leaveType,@Param("leaveStatus") String leaveStatus,@Param("empID") long empID );
    //Search leave by StartDate to StartDate
    @Query(value = "SELECT * FROM leaves l\n" +
            "WHERE l.start_date_for_all_day BETWEEN :startDate AND :startDate2\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveType% \n" +
            "and l.leave_status like :leaveStatus% \n" +
            "and l.employee_masterid_employee_masterid = :empID",nativeQuery = true)
    Collection<Leaves> Search_Leave_by_StartDate_To_StartDate(@Param("startDate") String startDate,@Param("startDate2") String startDate2,@Param("leaveType") String leaveType,@Param("leaveStatus") String leaveStatus,@Param("empID") long empID );

//***********************************************  date attendance *******************************************//
    //date attendance
    @Query(value = "SELECT * FROM leaves l,employee_master e\n" +
            "WHERE is_active_attendance='1' \n" +
            "and l.leave_status = 'Approve'\n" +
            "and e.role_status <> 'MANAGER'\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotComplete();

    //Data Attendance ค้นหา leaves By department,leaveType,leaveStatus,is_payment,CodeAndName
    @Query(value = "select * from leaves l,employee_master e\n" +
            "where l.departmentid like :departmentID% \n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID% \n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and l.is_payment like :isPayment%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and is_active_attendance='1'\n" +
            "and is_active='1'\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid \n" +
            "and e.role_status <> 'MANAGER'",nativeQuery = true)
    Collection<Leaves> SearchLeaveByDepartmentLeaveTypeLeaveStatusIspaymentCodeandName(@Param("departmentID") String departmentID,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("isPayment") String isPayment,@Param("codeAndName") String codeAndName);

    //Data Attendance ค้นหา leaves By StartDate to StartDate2 and All
    @Query(value = "select * from leaves l,employee_master e\n" +
            "where l.start_date_for_all_day BETWEEN :startDate AND :startDate2 \n" +
            "and l.departmentid like :departmentID% \n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID% \n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and l.is_payment like :isPayment%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and is_active_attendance='1'\n" +
            "and is_active='1'\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid \n" +
            "and e.role_status <> 'MANAGER'",nativeQuery = true)
    Collection<Leaves> SearchLeaveByStartDateToStartDate2AndAll(@Param("startDate") String startDate,@Param("startDate2") String startDate2,@Param("departmentID") String departmentID,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("isPayment") String isPayment,@Param("codeAndName") String codeAndName);

    //***********************************************  approveBySupervisor *******************************************//
    //approveBySupervisor //เห็นตาม master department role // ตอนไม่กด Complete
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Pending'\n" +
            "and l.employee_masterid_employee_masterid <> :empID \n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN-ADMIN')\n" +
            "and l.departmentid in ( \n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid=:empID\n" +
            "and e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotCompleteBySupervisor(@Param("empID") String empID );

    //approveBySupervisor ค้นหา leaves By leaveType,leaveStatus,CodeAndName
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.employee_masterid_employee_masterid <> :empID\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN')\n" +
            "and l.departmentid in ( \n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid = :empID\n" +
            "and e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> SearchLeaveInApproveSupByLeaveTypeLeaveStatusCodeName(@Param("empID") String empID,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("codeAndName") String codeAndName);

    //approveBySupervisor ค้นหา leaves By StartDate to StartDate2 and All
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.start_date_for_all_day BETWEEN :startDate AND :startDate2 \n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.employee_masterid_employee_masterid <> :empID\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN')\n" +
            "and l.departmentid in (\n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid = :empID\n" +
            "and e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> SearchLeaveInApproveSupByStartDateToStartDate2AndAll(@Param("empID") String empID,@Param("startDate") String startDate,@Param("startDate2") String startDate2,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("codeAndName") String codeAndName);


    //***********************************************  approveByManager *******************************************//
    // approveByManager //เห็นตาม master department role // ตอนไม่กด Approve
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_status = 'Waiting approve'\n" +
            "and l.employee_masterid_employee_masterid <> :empID2 \n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN' or e.role_status = 'SUPERVISOR')\n" +
            "and l.departmentid in ( \n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid=:empID2\n" +
            "and e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> getLeavesToNotApproveByManager(@Param("empID2") String empID2 );

    //approveByManager  ค้นหา leaves By leaveType,leaveStatus,CodeAndName
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.employee_masterid_employee_masterid <> :empID\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN' or e.role_status = 'SUPERVISOR')\n" +
            "and l.departmentid in (\n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid = :empID\n" +
            "and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> SearchLeaveInApproveManagerByLeaveTypeLeaveStatusCodeName(@Param("empID") String empID,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("codeAndName") String codeAndName);

    //approveByManager ค้นหา leaves By StartDate to StartDate2 and All
    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.start_date_for_all_day BETWEEN :startDate AND :startDate2\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and l.leave_status like :leaveStatus%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.employee_masterid_employee_masterid <> :empID\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR-ADMIN' or e.role_status = 'SUPERVISOR')\n" +
            "and l.departmentid in (\n" +
            "select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "where e.employee_masterid = :empID\n" +
            "and e.employee_masterid = dr.employee_masterid)" ,nativeQuery = true)
    Collection<Leaves> SearchLeaveInApproveManagerByStartDateToStartDate2AndAll(@Param("empID") String empID,@Param("startDate") String startDate,@Param("startDate2") String startDate2,@Param("leaveTypeID") String leaveTypeID,@Param("leaveStatus") String leaveStatus,@Param("codeAndName") String codeAndName);


    //***********************************************  DC Manager *******************************************//
    //DC Manager show leave at manager
    @Query(value = "select * from leaves l ,employee_master e\n" +
            "where e.role_status='MANAGER'\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" ,nativeQuery = true)
    Collection<Leaves> getLeaveAtManager();

    //DC Manager  ค้นหา leaves By leaveType,CodeAndName
    @Query(value = "select * from leaves l ,employee_master e\n" +
            "where e.role_status='MANAGER'\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid",nativeQuery = true)
    Collection<Leaves> SearchLeaveInDCManagerByLeaveTypeAndCodeName(@Param("leaveTypeID") String leaveTypeID,@Param("codeAndName") String codeAndName);

    //DC Manager  ค้นหา leaves By StartDate to StartDate2 and All
    @Query(value = "select * from leaves l ,employee_master e\n" +
            "where e.role_status='MANAGER'\n" +
            "and l.start_date_for_all_day BETWEEN :startDate AND :startDate2\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeID%\n" +
            "and (e.employee_master_customer_code like :codeAndName% or e.employee_master_first_name like :codeAndName% or e.employee_master_last_name like :codeAndName%)\n" +
            "and l.is_active_attendance=1\n" +
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid",nativeQuery = true)
    Collection<Leaves> SearchLeaveInDCManagerByStartDateToStartDate2AndAll(@Param("startDate") String startDate,@Param("startDate2") String startDate2,@Param("leaveTypeID") String leaveTypeID,@Param("codeAndName") String codeAndName);

}
