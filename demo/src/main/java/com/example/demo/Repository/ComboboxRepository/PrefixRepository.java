package com.example.demo.Repository.ComboboxRepository;

import com.example.demo.Entity.Combobox.Prefix;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
@Repository
public interface PrefixRepository extends JpaRepository<Prefix,Long>{

}
