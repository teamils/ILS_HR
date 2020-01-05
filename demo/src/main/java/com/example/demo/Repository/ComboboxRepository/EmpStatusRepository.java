package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.EmpStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpStatusRepository extends JpaRepository<EmpStatus,Long>{

}
