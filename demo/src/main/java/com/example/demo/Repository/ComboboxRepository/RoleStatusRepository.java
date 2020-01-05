package com.example.demo.Repository.ComboboxRepository;
import com.example.demo.Entity.Combobox.RoleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleStatusRepository extends JpaRepository<RoleStatus,Long>{

}
