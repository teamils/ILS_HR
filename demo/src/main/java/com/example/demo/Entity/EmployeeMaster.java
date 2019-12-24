package com.example.demo.Entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

@Entity
@EqualsAndHashCode
@ToString
@Table(name = "EmployeeMaster")
public class EmployeeMaster {
    @Id
    @SequenceGenerator(name = "Emp_seq1", sequenceName = "Emp_seq1",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Emp_seq1")
    private long employeeMasterID;
    //@Id @GeneratedValue(strategy=GenerationType.AUTO)

    private String employeeMasterCustomerCode;
    private String prefix;
    private String employeeMasterFirstName;
    private String employeeMasterLastName;
    private String employeeMasterNickName;
    private String employeeMasterGender;
    private String maritalStatus;

    @Temporal(TemporalType.DATE)
    private Date employeeMasterBirthDate;

    private String employeeMasterPersonID;
    private String employeeMasterTel1;
    private String empEmail;
    private String empAddressReal;
    private String empAddressPerson;

    @Temporal(TemporalType.DATE)
    private Date employeeMasterStartDate;

    private String employeePosition;
    private String employeeDepartment;
    private String employeeType;
    private String education;
    private String bank;
    private String bankNumber;
    private String isActive;
    private String roleStatus;
    private String password;


    public void setEmployeeMasterID(long employeeMasterID) {
        this.employeeMasterID = employeeMasterID;
    }

    public String getRoleStatus() {
        return roleStatus;
    }

    public void setRoleStatus(String roleStatus) {
        this.roleStatus = roleStatus;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }


    public  EmployeeMaster (){ }
    public Date getEmployeeMasterBirthDate() {
        return employeeMasterBirthDate;
    }

    public void setEmployeeMasterBirthDate(Date employeeMasterBirthDate) {
        this.employeeMasterBirthDate = employeeMasterBirthDate;
    }

    public Date getEmployeeMasterStartDate() {
        return employeeMasterStartDate;
    }

    public void setEmployeeMasterStartDate(Date employeeMasterStartDate) {
        this.employeeMasterStartDate = employeeMasterStartDate;
    }


    public Long getEmployeeMasterID() {
        return employeeMasterID;
    }

    public void setEmployeeMasterID(Long employeeMasterID) {
        this.employeeMasterID = employeeMasterID;
    }

    public String getEmployeeMasterCustomerCode() {
        return employeeMasterCustomerCode;
    }

    public void setEmployeeMasterCustomerCode(String employeeMasterCustomerCode) {
        this.employeeMasterCustomerCode = employeeMasterCustomerCode;
    }

    public String getEmployeeMasterFirstName() {
        return employeeMasterFirstName;
    }

    public void setEmployeeMasterFirstName(String employeeMasterFirstName) {
        this.employeeMasterFirstName = employeeMasterFirstName;
    }

    public String getEmployeeMasterLastName() {
        return employeeMasterLastName;
    }

    public void setEmployeeMasterLastName(String employeeMasterLastName) {
        this.employeeMasterLastName = employeeMasterLastName;
    }

    public String getEmployeeMasterNickName() {
        return employeeMasterNickName;
    }

    public void setEmployeeMasterNickName(String employeeMasterNickName) {
        this.employeeMasterNickName = employeeMasterNickName;
    }

    public String getEmployeeMasterGender() {
        return employeeMasterGender;
    }

    public void setEmployeeMasterGender(String employeeMasterGender) {
        this.employeeMasterGender = employeeMasterGender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }



    public String getEmployeeMasterPersonID() {
        return employeeMasterPersonID;
    }

    public void setEmployeeMasterPersonID(String employeeMasterPersonID) {
        this.employeeMasterPersonID = employeeMasterPersonID;
    }

    public String getEmployeeMasterTel1() {
        return employeeMasterTel1;
    }

    public void setEmployeeMasterTel1(String employeeMasterTel1) {
        this.employeeMasterTel1 = employeeMasterTel1;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
    }

    public String getEmpAddressReal() {
        return empAddressReal;
    }

    public void setEmpAddressReal(String empAddressReal) {
        this.empAddressReal = empAddressReal;
    }

    public String getEmpAddressPerson() {
        return empAddressPerson;
    }

    public void setEmpAddressPerson(String empAddressPerson) {
        this.empAddressPerson = empAddressPerson;
    }



    public String getEmployeePosition() {
        return employeePosition;
    }

    public void setEmployeePosition(String employeePosition) {
        this.employeePosition = employeePosition;
    }

    public String getEmployeeDepartment() {
        return employeeDepartment;
    }

    public void setEmployeeDepartment(String employeeDepartment) {
        this.employeeDepartment = employeeDepartment;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(String bankNumber) {
        this.bankNumber = bankNumber;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }



}
