package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education,Long>{
}
