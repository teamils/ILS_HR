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

        @Query(value = "SELECT * FROM DEPARTMENT_MASTER_ROLE d,employee_master e\n" +
                "where (e.employee_master_customer_code LIKE %:keyword%  or e.employee_master_first_name LIKE %:keyword%  or e.employee_master_last_name LIKE %:keyword%)\n" +
                "and e.employee_masterid = d.employee_masterid",nativeQuery = true)
        Collection<DepartmentMasterRole> queryDepartmentMasterRole2(@Param("keyword") String keyword);

        @Query(value = "select * from  department_master_role d\n" +
                "where d.departmentid = :departmentID",nativeQuery = true)
        Collection<DepartmentMasterRole> queryDepartmentMasterRoleFindByDepartmentID(@Param("departmentID") long departmentID);

}
