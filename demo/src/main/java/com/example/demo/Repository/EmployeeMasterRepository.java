package com.example.demo.Repository;

import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
<<<<<<< HEAD
import org.springframework.data.repository.query.Param;
=======
import org.springframework.stereotype.Repository;
>>>>>>> c04ea9cee60c35d389fbfd126ec0811e5250ef0d
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collection;

@Repository
public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster,Long> {

    EmployeeMaster findByemployeeMasterCustomerCode(String employeeMasterCustomerCode);

    EmployeeMaster findByemployeeMasterCustomerCodeAndPasswordAndIsActive(String employeeMasterCustomerCode, String password,String isActive );

    @Query(value = "SELECT * FROM employee_master where is_active=1;",nativeQuery = true)
    Collection<EmployeeMaster> QueryEmployee();

   /* @Query(value = "SELECT * FROM employee_master WHERE employee_master_customer_code = :dataSearch;",nativeQuery = true)
    Collection<EmployeeMaster> getEmployee(@Param("id") Long id );*/

}
