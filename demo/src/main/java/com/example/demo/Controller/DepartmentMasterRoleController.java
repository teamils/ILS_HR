package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.Department;
import com.example.demo.Entity.DepartmentMasterRole;
import com.example.demo.Entity.EmployeeMaster;
import com.example.demo.Repository.*;
import com.example.demo.Repository.ComboboxRepository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class DepartmentMasterRoleController {
    @Autowired private DepartmentMasterRoleRepository departmentMasterRoleRepository;
    @Autowired private EmployeeMasterRepository employeeMasterRepository;
    @Autowired private DepartmentRepository departmentRepository;

    @GetMapping(path = "/DepartmentMasterRole")
    public Iterable<DepartmentMasterRole> departmentMasterRoles() {
        return departmentMasterRoleRepository.findAll().stream().collect(Collectors.toList());
    }

    @PostMapping(path = "/insertDataDepartmentRole/{employeeMasterID}/{departmentSelect}/{name}")
    public DepartmentMasterRole departmentMasterRole(@PathVariable long employeeMasterID,@PathVariable long departmentSelect,@PathVariable String name) {
            EmployeeMaster employeeMaster = employeeMasterRepository.findById(employeeMasterID).get();
            Department department = departmentRepository.findById(departmentSelect).get();
            DepartmentMasterRole departmentMasterRole = new DepartmentMasterRole();
            departmentMasterRole.setEmployeeMasterid(employeeMaster);
            departmentMasterRole.setDepartmentid(department);
            departmentMasterRole.setCreate_date(new Date());
            departmentMasterRole.setCreate_by(name);
            return  departmentMasterRoleRepository.save(departmentMasterRole);
    }

    @GetMapping("/DepartmentMasterRoleFindByEmpIDAndDepartmentID/{employeeMasterID}/{departmentSelect}")
    public DepartmentMasterRole DepartmentMasterRoleFindByEmpIDAndDepartmentID(@PathVariable long employeeMasterID,@PathVariable long departmentSelect) {
        EmployeeMaster employeeMaster = employeeMasterRepository.findById(employeeMasterID).get();
        Department department = departmentRepository.findById(departmentSelect).get();
        DepartmentMasterRole departmentMasterRole = departmentMasterRoleRepository.findByEmployeeMasteridAndDepartmentid(employeeMaster,department);
        return departmentMasterRole;
    }

    @GetMapping("/getDepartmentMasterRole/{employeeMasterID}")
    public Iterable<DepartmentMasterRole> getDepartmentMasterRole(@PathVariable long employeeMasterID) {
        return this.departmentMasterRoleRepository.queryDepartmentMasterRole(employeeMasterID);
    }
    @GetMapping("/getDepartmentMasterRoleFindByEmpCode/{keyword}")
    public Iterable<DepartmentMasterRole> getDepartmentMasterRoleFindByEmpCode(@PathVariable String keyword) {
        return this.departmentMasterRoleRepository.queryDepartmentMasterRole2(keyword);
    }

    @DeleteMapping("/deleteRole/{departmentRoleID}")
    public DepartmentMasterRole deleteRole(@PathVariable long departmentRoleID) {
        DepartmentMasterRole departmentMasterRole = departmentMasterRoleRepository.findById(departmentRoleID).get();
        departmentMasterRoleRepository.delete(departmentMasterRole);
        return null;
    }

    @GetMapping("/getDepartmentMasterRoleFindByDepartmentID/{departmentID}")
    public Iterable<DepartmentMasterRole> getDepartmentMasterRoleFindByDepartmentID(@PathVariable long departmentID) {
        return this.departmentMasterRoleRepository.queryDepartmentMasterRoleFindByDepartmentID(departmentID);
    }
}
