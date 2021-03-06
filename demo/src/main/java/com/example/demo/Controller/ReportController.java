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

    @GetMapping("/getLeavesEmployee/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesEmployee(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesEmployee(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }



    @GetMapping("/getLeavesEmployeeHavedate/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesEmployeeHavedate(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect , @PathVariable String leavePayment,
                                                      @PathVariable String dataSearch,@PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesEmployeeHaveDate(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }




    ///////////////////SUP/////////////////////////////

    @GetMapping("/getLeavesSupervisor/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesSupervisor(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesSupervisor(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }


    @GetMapping("/getLeavesSupervisorHavedate/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesSupervisorHaveDate(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch
            , @PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesSupervisorHavedate(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }


    @GetMapping("/getLeavesManager/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesManager(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesManager(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }



    @GetMapping("/getLeavesManagerHavedate/{empid}/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesManagerHavedate(@PathVariable String empid , @PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch
            , @PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesManagerHaveDate(empid,leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }


    @GetMapping("/getLeavesDCManager/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesDCManager(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesDCManager(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }

    @GetMapping("/getLeavesDCManagerHavedate/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesDCManagerHavedate(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch
            , @PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesDCManagerHaveDate(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }


    @GetMapping("/getLeavesHRADMIN/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesHRADMIN(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesHRADMIN(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }


    @GetMapping("/getLeavesHRADMINHavedate/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesHRADMINHavedate(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch
            , @PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesHRADMINHaveDate(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }


    @GetMapping("/getLeavesADMIN/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}")
    public Iterable<Leaves> getLeavesADMIN(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesADMIN(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch);
    }


    @GetMapping("/getLeavesADMINHaveDate/{leaveTypeSearch}/{leaveStatusSearch}/{departmentSelect}/{leavePayment}/{dataSearch}/{datestart}/{dateend}")
    public Iterable<Leaves> getLeavesADMINHaveDate(@PathVariable String leaveTypeSearch
            ,@PathVariable String leaveStatusSearch, @PathVariable String departmentSelect
            , @PathVariable String leavePayment,@PathVariable String dataSearch
            , @PathVariable String datestart,@PathVariable String dateend) {


        if(leaveTypeSearch.equals("undefined")){
            leaveTypeSearch = "";
        }
        if(leaveStatusSearch.equals("undefined")){
            leaveStatusSearch = "";
        }
        if(departmentSelect.equals("undefined")){
            departmentSelect = "";
        }
        if(leavePayment.equals("undefined")){
            leavePayment = "";
        }
        if(dataSearch.equals("undefined")){
            dataSearch = "";
        }

        return this.reportRepository.getLeavesADMINHaveDate(leaveTypeSearch,leaveStatusSearch,departmentSelect,leavePayment,dataSearch,datestart,dateend);
    }
}
