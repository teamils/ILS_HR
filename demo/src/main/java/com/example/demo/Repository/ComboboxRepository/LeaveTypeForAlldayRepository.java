package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.LeaveTypeForAllday;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface LeaveTypeForAlldayRepository extends JpaRepository<LeaveTypeForAllday,Long> {

    LeaveTypeForAllday findByLeaveTypeForAlldayName(String leaveTypeForAlldayName);

    @Query(value = "SELECT * FROM leave_type_for_allday",nativeQuery = true)
    Collection<LeaveTypeForAllday> showleaveTypeForAllday();

}
