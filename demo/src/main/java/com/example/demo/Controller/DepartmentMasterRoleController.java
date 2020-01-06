package com.example.demo.Controller;
import com.example.demo.Entity.Combobox.EmpStatus;
import com.example.demo.Entity.DepartmentMasterRole;
import com.example.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class DepartmentMasterRoleController {
    @Autowired private DepartmentMasterRoleRepository departmentMasterRoleRepository;

    @GetMapping(path = "/DepartmentMasterRole")
    public Iterable<DepartmentMasterRole> departmentMasterRoles() {
        return departmentMasterRoleRepository.findAll().stream().collect(Collectors.toList());
    }
}
