import { Component } from '@angular/core';

export const API1 = 'http://localhost:8080';
//export const API1 = 'http://192.168.1.47:8080/ILS_HR';
//export const API1 = 'http://192.168.1.40:8000';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ILS_HR';

}
