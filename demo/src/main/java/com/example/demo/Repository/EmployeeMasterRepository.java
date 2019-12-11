package com.example.demo.Repository;

import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@EnableJpaRepositories
public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster,Long> {

    EmployeeMaster findByemployeeMasterCustomerCode(String employeeMasterCustomerCode);


    EmployeeMaster findByemployeeMasterCustomerCodeAndPasswordAndIsActive(String employeeMasterCustomerCode, String password,String isActive );

}
