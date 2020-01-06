package com.example.demo.Repository;
import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentMasterRoleRepository extends JpaRepository<DepartmentMasterRole,Long>{

}
