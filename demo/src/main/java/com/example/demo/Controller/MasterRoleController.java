package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class MasterRoleController {
    @Autowired private MasterRoleRepository masterRoleRepository;

    @GetMapping(path = "/masterRole")
    public Iterable<MasterRole> masterRole() {
        return masterRoleRepository.findAll().stream().collect(Collectors.toList());
    }
}
