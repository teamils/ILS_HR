package com.example.demo.Repository.ComboboxRepository;

import com.example.demo.Entity.Combobox.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface BankRepository extends JpaRepository<Bank,Long>{

}
