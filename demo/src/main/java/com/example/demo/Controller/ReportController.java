package com.example.demo.Controller;

import com.example.demo.Entity.Leaves;
import com.example.demo.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")


public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/getLeavesEmployee/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}")
    public Iterable<Leaves> getLeavesEmployee(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect , @PathVariable String leavePayment) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment .equals("undefined")){
            leavePayment = "";
        }

        return this.reportRepository.getLeavesEmployee(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment);
    }
}
