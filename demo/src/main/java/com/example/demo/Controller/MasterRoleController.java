package com.example.demo.Controller;
import com.example.demo.Repository.*;
import com.example.demo.Entity.*;
import com.sun.xml.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class MasterRoleController {
    @Autowired private MasterRoleRepository masterRoleRepository;

    @Autowired
    private MailService notificationService;

    @GetMapping(path = "/masterRole")
    public Iterable<MasterRole> masterRole() {
        return masterRoleRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping(path = "/sendEmail")
    public void emailnakub() throws MessagingException, javax.mail.MessagingException {
        notificationService.sendEmail();
    }


}
