package com.example.demo.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "Bank")
public class Bank {
    @Id
    @SequenceGenerator(name = "Bank_seq", sequenceName = "Bank_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Bank_seq")
    private long bankID;
    private String bankName;

    public long getBankID() {
        return bankID;
    }

    public void setBankID(long bankID) {
        this.bankID = bankID;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }


}
