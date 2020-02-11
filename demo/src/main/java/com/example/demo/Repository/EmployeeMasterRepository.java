package com.example.demo.Repository;

import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;

@Repository
public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster,Long> {

    EmployeeMaster findByemployeeMasterCustomerCode(String employeeMasterCustomerCode);

    EmployeeMaster findByemployeeMasterCustomerCodeAndPasswordAndIsActive(String employeeMasterCustomerCode, String password,String isActive );

    @Query(value = "SELECT * FROM employee_master where is_active=1;",nativeQuery = true)
    Collection<EmployeeMaster> QueryEmployee();

    @Query(value = "select * from employee_master where employee_masterid=:empID and is_active=1;",nativeQuery = true)
    Collection<EmployeeMaster> QueryEmployee1person(@Param("empID") Long empID );

    @Query(value = "select * from employee_master e\n" +
            "where (e.employee_master_customer_code like %:searchDate% \n" +
            "\tor e.employee_master_first_name like %:searchDate% \n" +
            "\tor e.employee_master_last_name like %:searchDate%)\n" +
            "and e.employee_master_gender like :gender%\n" +
            "and e.departmentid_departmentid like :departmentID%\n" +
            "and e.employee_position like :position%\n" +
            "and e.employee_type like :empType%",nativeQuery = true)
    Collection<EmployeeMaster> SearchEmployeeInReport(@Param("searchDate") String searchDate,@Param("gender") String gender,
                                                      @Param("departmentID") String departmentID,@Param("position") String position,
                                                      @Param("empType") String empType);

}
