import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-by-supervisor',
  templateUrl: './approve-by-supervisor.component.html',
  styleUrls: ['./approve-by-supervisor.component.css']
})
export class ApproveBySupervisorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('empId ->',localStorage.getItem('empId'));
  }

}
