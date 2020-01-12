package com.example.demo.Repository;
import com.example.demo.Entity.*;
import com.example.demo.Entity.Combobox.Department;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface DepartmentMasterRoleRepository extends JpaRepository<DepartmentMasterRole,Long>{
        DepartmentMasterRole findByEmployeeMasteridAndDepartmentid(EmployeeMaster employeeMasterid,Department departmentid);

        @Query(value = "SELECT * FROM DEPARTMENT_MASTER_ROLE where EMPLOYEE_MASTERID = :employeeID",nativeQuery = true)
        Collection<DepartmentMasterRole> queryDepartmentMasterRole(@Param("employeeID") long employeeID);

}
