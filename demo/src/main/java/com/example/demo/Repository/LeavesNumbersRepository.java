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
public interface LeavesNumbersRepository extends JpaRepository<LeavesNumbers,Long>{
        @Query(value = "select * from leaves_numbers where employee_masterid = :employeeID",nativeQuery = true)
        Collection<LeavesNumbers> getLeaveNumber(@Param("employeeID") String employeeID );
}
