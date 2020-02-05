package com.example.demo.Repository;

import com.example.demo.Entity.Leaves;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository


public interface ReportRepository extends JpaRepository<Leaves,Long> {


    // ของ Employee Search ไม่มี Date
    @Query(value = "select * from leaves , employee_master\n" +
            "where (employee_master_customer_code LIKE %:dataSearch% or employee_master_first_name like %:dataSearch% or employee_master_last_name like %:dataSearch%)\n" +
            "and leaves.employee_masterid_employee_masterid = employee_master.employee_masterid\n"+
            "and leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n" +
            "and employee_masterid_employee_masterid = :empid \n" +
            "and leave_status like :leaveStatusSearch% \n" +
            "and departmentid like :departmentSelect% \n" +
            "and is_payment like :leavePayment% " +
            "and is_active_attendance = 1",nativeQuery = true)
    Collection<Leaves> getLeavesEmployee(@Param("empid") String empid,
                                         @Param("leaveTypeSearch") String leaveTypeSearch,
                                         @Param("leaveStatusSearch") String leaveStatusSearch,
                                         @Param("departmentSelect") String departmentSelect,
                                         @Param("leavePayment") String leavePayment,
                                         @Param("dataSearch") String dataSearch);


    @Query(value = "select * from leaves , employee_master\n" +
            "where start_date_for_all_day between :datestart and :dateend\n" +
            "and (employee_master_customer_code LIKE %:dataSearch% or employee_master_first_name like %:dataSearch% or employee_master_last_name like %:dataSearch%)\n" +
            "and leaves.employee_masterid_employee_masterid = employee_master.employee_masterid\n"+
            "and leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n" +
            "and employee_masterid_employee_masterid = :empid \n" +
            "and leave_status like :leaveStatusSearch% \n" +
            "and departmentid like :departmentSelect% \n" +
            "and is_payment like :leavePayment% " +
            "and is_active_attendance = 1",nativeQuery = true)
    Collection<Leaves> getLeavesEmployeeHaveDate(@Param("empid") String empid,
                                         @Param("leaveTypeSearch") String leaveTypeSearch,
                                         @Param("leaveStatusSearch") String leaveStatusSearch,
                                         @Param("departmentSelect") String departmentSelect,
                                         @Param("leavePayment") String leavePayment,
                                         @Param("dataSearch") String dataSearch,
                                                 @Param("datestart") String datestart,
                                                 @Param("dateend") String dateend);




    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.is_active_attendance=1\n"+
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR' or e.employee_masterid = :empid)\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n"+
            "and l.leave_status like :leaveStatusSearch% \n"+
            "and l.departmentid like :departmentSelect% \n"+
            "and l.is_payment like :leavePayment% \n"+
            "and (e.employee_master_customer_code LIKE %:dataSearch% or e.employee_master_first_name like %:dataSearch% or e.employee_master_last_name like %:dataSearch%)\n"+
            "and l.departmentid in ( \n" +
            "            select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "            where e.employee_masterid=:empid\n" +
            "            and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> getLeavesSupervisor(@Param("empid") String empid,
                                                 @Param("leaveTypeSearch") String leaveTypeSearch,
                                                 @Param("leaveStatusSearch") String leaveStatusSearch,
                                                 @Param("departmentSelect") String departmentSelect,
                                                 @Param("leavePayment") String leavePayment,
                                                 @Param("dataSearch") String dataSearch);


    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.start_date_for_all_day between :datestart and :dateend\n"+
            "and l.is_active_attendance=1\n"+
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR' or e.employee_masterid = :empid)\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n"+
            "and l.leave_status like :leaveStatusSearch% \n"+
            "and l.departmentid like :departmentSelect% \n"+
            "and l.is_payment like :leavePayment% \n"+
            "and (e.employee_master_customer_code LIKE %:dataSearch% or e.employee_master_first_name like %:dataSearch% or e.employee_master_last_name like %:dataSearch%)\n"+
            "and l.departmentid in ( \n" +
            "            select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "            where e.employee_masterid=:empid\n" +
            "            and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> getLeavesSupervisorHavedate(@Param("empid") String empid,
                                           @Param("leaveTypeSearch") String leaveTypeSearch,
                                           @Param("leaveStatusSearch") String leaveStatusSearch,
                                           @Param("departmentSelect") String departmentSelect,
                                           @Param("leavePayment") String leavePayment,
                                           @Param("dataSearch") String dataSearch,@Param("datestart") String datestart,@Param("dateend") String dateend);


    @Query(value = "select * from leaves l,department d,employee_master e\n" +
            "where l.departmentid = d.departmentid\n" +
            "and l.is_active_attendance=1\n"+
            "and e.is_active=1\n" +
            "and l.employee_masterid_employee_masterid = e.employee_masterid\n" +
            "and (e.role_status = 'EMPLOYEE' or e.role_status = 'HR' or e.employee_masterid = :empid  or e.role_status = 'SUPERVISOR')\n" +
            "and l.leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n"+
            "and l.leave_status like :leaveStatusSearch% \n"+
            "and l.departmentid like :departmentSelect% \n"+
            "and l.is_payment like :leavePayment% \n"+
            "and (e.employee_master_customer_code LIKE %:dataSearch% or e.employee_master_first_name like %:dataSearch% or e.employee_master_last_name like %:dataSearch%)\n"+
            "and l.departmentid in ( \n" +
            "            select distinct(dr.departmentid)from employee_master e,department_master_role dr\n" +
            "            where e.employee_masterid=:empid\n" +
            "            and e.employee_masterid = dr.employee_masterid)",nativeQuery = true)
    Collection<Leaves> getLeavesManager(@Param("empid") String empid,
                                           @Param("leaveTypeSearch") String leaveTypeSearch,
                                           @Param("leaveStatusSearch") String leaveStatusSearch,
                                           @Param("departmentSelect") String departmentSelect,
                                           @Param("leavePayment") String leavePayment,
                                           @Param("dataSearch") String dataSearch);
}
