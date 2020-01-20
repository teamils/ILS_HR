package com.example.demo.Repository;
import com.example.demo.Entity.*;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRole,Long>{
    // SearchUserRoles 1 คน
    @Query(value = "select * from user_role u\n" +
            "where u.empid = :empID",nativeQuery = true)
    Collection<UserRole> SearchUserRoles(@Param("empID") long empID );

    UserRole findByEmpIDAndMasterRoleID(EmployeeMaster empID,MasterRole masterRoleID);

}
