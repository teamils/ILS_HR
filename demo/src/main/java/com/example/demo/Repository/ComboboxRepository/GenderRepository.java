package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderRepository extends JpaRepository<Gender,Long>{

}
