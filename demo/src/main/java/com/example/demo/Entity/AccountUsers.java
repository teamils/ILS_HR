package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity

public class AccountUsers {
    @Id
    @SequenceGenerator(name = "user_seq",sequenceName = "user_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "user_seq")
    private Long accountID;

    private String username;
    private String password;
    private String status;

    @ManyToOne
    @JsonProperty("employeeMasterid")
    @JoinColumn(name = "employeeMaster_id")
    private EmployeeMaster employeeMasterid;

    public AccountUsers(){}
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public EmployeeMaster getEmployeeMasterid() {
        return employeeMasterid;
    }

    public void setEmployeeMasterid(EmployeeMaster employeeMasterid) {
        this.employeeMasterid = employeeMasterid;
    }



    public Long getAccountID() {
        return accountID;
    }

    public void setAccountID(Long accountID) {
        this.accountID = accountID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }




}
