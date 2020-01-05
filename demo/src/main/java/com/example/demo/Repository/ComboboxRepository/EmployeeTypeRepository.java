package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.EmployeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeTypeRepository extends JpaRepository<EmployeeType,Long> {

}
