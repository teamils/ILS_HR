import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
providedIn: 'root'
})
export class ExcelService {
month : number;
monthstring : string;
constructor() { }
public exportAsExcelFile(json: any[], excelFileName: string): void {


var wscols = [
    {wch:5},
    {wch:20},
    {wch:20},
    {wch:20},
    {wch:15},
    {wch:10},
    {wch:15},
    {wch:30},
    {wch:20},
    {wch:20},
    {wch:10},
];


  XLSX.SSF.format('$#,##0.00', 12345.6789)
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  worksheet['!cols'] = wscols;



  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  console.log(worksheet,workbook);

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  this.saveAsExcelFile(excelBuffer, excelFileName);




}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});

    this.month = new Date().getMonth()+1;
    this.monthstring =  this.month.toString();

   FileSaver.saveAs(data, fileName + '_export_' + new Date().getDate()  + '-'  +this.monthstring+ '-' + new Date().getFullYear());
}
}
