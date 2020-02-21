package com.example.demo.Repository.ComboboxRepository;

import com.example.demo.Entity.Combobox.Department;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


import java.util.Collection;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,Long> {
    Department findByDepartmentName(String departmentName);


    @Query(value = "select * from department order by department_name",nativeQuery = true)
    Collection<Department> getDepartmentOrderByName();


}
