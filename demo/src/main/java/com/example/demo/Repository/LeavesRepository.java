package com.example.demo.Repository;
import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

@CrossOrigin(origins = "*")
@EnableJpaRepositories
public interface LeavesRepository extends JpaRepository<Leaves,Long>{
    Leaves findByemployeeMasterid(EmployeeMaster employeeMasterid);

    //getLeaves 1คน
    @Query(value = "SELECT * FROM leaves WHERE employee_masterid_employee_masterid = :employeeCode " +
            "and is_active_attendance='1' and (leave_status = 'waiting' or leave_status='Complete') " +
            "and (approved_by_supervisor='not approved' or approved_by_manager='not approved') " +
            "and (label_leave_half_day='ครึ่งวันเช้า' or label_leave_half_day='ครึ่งวันบ่าย')",nativeQuery = true)
    Collection<Leaves> getLeaves(@Param("employeeCode") String employeeCode );

    @Query(value = "SELECT * FROM leaves WHERE employee_masterid_employee_masterid = :employeeCode2 " +
            "and is_active_attendance='1' and (leave_status = 'waiting' or leave_status='Complete') " +
            "and (approved_by_supervisor='not approved' or approved_by_manager='not approved')" +
            "and (label_leave_half_day IS NULL)",nativeQuery = true)
    Collection<Leaves> getLeaves2(@Param("employeeCode2") String employeeCode2 );

}