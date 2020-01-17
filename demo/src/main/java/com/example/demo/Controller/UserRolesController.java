package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.Prefix;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class UserRolesController {
    @Autowired private UserRolesRepository userRolesRepository;
    @Autowired private MasterRoleRepository masterRoleRepository;
    @Autowired private EmployeeMasterRepository employeeMasterRepository;

    @GetMapping("/userRoles/{empID}")
    public Iterable<UserRole> UserRoles(@PathVariable long empID) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(empID).get();
        return this.userRolesRepository.SearchUserRoles(employeeMaster.getEmployeeMasterID());
    }

    @GetMapping("/userRolesByEmpCode/{empCode}")
    public Iterable<UserRole> userRolesByEmpCode(@PathVariable String empCode) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findByemployeeMasterCustomerCode(empCode);
        return this.userRolesRepository.SearchUserRoles(employeeMaster.getEmployeeMasterID());
    }

    @DeleteMapping("/deleteUserRoles/{userRolesID}")
    public UserRole deleteUserRoles(@PathVariable long userRolesID) {
        UserRole deleteUserRoles = userRolesRepository.findById(userRolesID).get();
        userRolesRepository.delete(deleteUserRoles);
        return null;
    }

    @PostMapping("/insertUserRole/{employeeMasterID}/{toppings}")
    public UserRole insertUserRole(@PathVariable long employeeMasterID,@PathVariable long toppings) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(employeeMasterID).get();
        MasterRole masterRole = masterRoleRepository.findById(toppings).get();

        UserRole userRole = new UserRole();
        userRole.setEmpID(employeeMaster);
        userRole.setMasterRoleID(masterRole);
        userRolesRepository.save(userRole);
        return userRole;
    }

    @GetMapping("/getUserRoleByempIDAndMasterRoleID/{employeeMasterID}/{masterRoleID}")
    public Iterable<UserRole> userRoleRoleFindByEmployeeMasterIdAndID(@PathVariable long employeeMasterID,@PathVariable long masterRoleID) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(employeeMasterID).get();
        MasterRole masterRole = masterRoleRepository.findById(masterRoleID).get();
        return this.userRolesRepository.SearchUserRolesByempIDandmasterRoleID(employeeMaster.getEmployeeMasterID(),masterRole.getId());
    }

}
