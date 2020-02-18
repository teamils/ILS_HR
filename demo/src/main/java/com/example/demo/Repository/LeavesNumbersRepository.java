package com.example.demo.Repository;
import com.example.demo.Entity.*;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
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
        LeavesNumbers findByEmployeeMasteridAndLeavesNumbersID(Long employeeMasterid,Long leavesNumbersID);


        @Query(value = "select * from leaves_numbers where employee_masterid = :employeeID",nativeQuery = true)
        Collection<LeavesNumbers> getLeaveNumber(@Param("employeeID") String employeeID );

        @Query(value = "select * from leaves_numbers\n" +
                "where leave_typeid = 3 \n" +
                "order by employee_masterid",nativeQuery = true)
        Collection<LeavesNumbers> getleaveNumber3Vacation();

        @Query(value = "SELECT * FROM leaves_numbers WHERE employee_masterid= :employeeID2 and leave_typeid=:leaveID",nativeQuery = true)
        Collection<LeavesNumbers> show1rowof1person(@Param("employeeID2") String employeeID2 ,@Param("leaveID") Long leaveID);

        @Query(value = "UPDATE leaves_numbers\n" +
                "SET balance_day = :getDay , compound_day = 0 , diff_day = 0 , get_day = :getDay ,used_day=0\n" +
                "WHERE leave_typeid = 1 or leave_typeid = 5",nativeQuery = true)
        Collection<LeavesNumbers> resetleaveNumber1(@Param("getDay") double getDay);

        @Query(value = "UPDATE leaves_numbers\n" +
                "SET balance_day = :getDay , compound_day = 0 , diff_day = 0 , get_day = :getDay ,used_day=0\n" +
                "WHERE leave_typeid = 1 or leave_typeid = 5",nativeQuery = true)
        Collection<LeavesNumbers> resetleaveNumber5(@Param("getDay") double getDay);

        @Query(value = "UPDATE leaves_numbers\n" +
                "SET balance_day = :getDay , compound_day = 0 , diff_day = 0 , get_day = :getDay ,used_day=0\n" +
                "WHERE leave_typeid = 2",nativeQuery = true)
        Collection<LeavesNumbers> resetleaveNumber2(@Param("getDay") double getDay);

        @Query(value = "UPDATE leaves_numbers\n" +
                "SET balance_day = :getDay , compound_day = 0 , diff_day = 0 , get_day = :getDay ,used_day=0\n" +
                "WHERE leave_typeid = 8",nativeQuery = true)
        Collection<LeavesNumbers> resetleaveNumber8(@Param("getDay") double getDay);



}
