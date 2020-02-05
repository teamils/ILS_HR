package com.example.demo.Repository;

import com.example.demo.Entity.Leaves;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository


public interface ReportRepository extends JpaRepository<Leaves,Long> {

    @Query(value = "select * from leaves \n" +
            "where leave_type_for_all_day_leave_type_for_alldayid like :leaveTypeSearch% \n" +
            "and employee_masterid_employee_masterid = :empid \n" +
            "and leave_status like :leaveStatusSearch% \n" +
            "and departmentid like :departmentSelect% \n" +
            "and is_payment like :leavePayment% " +
            "and is_active_attendance = 1",nativeQuery = true)
    Collection<Leaves> getLeavesEmployee(@Param("empid") String empid,
                                         @Param("leaveTypeSearch") String leaveTypeSearch,
                                         @Param("leaveStatusSearch") String leaveStatusSearch,
                                         @Param("departmentSelect") String departmentSelect,
                                         @Param("leavePayment") String leavePayment);
}
