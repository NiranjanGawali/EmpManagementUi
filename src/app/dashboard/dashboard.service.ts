import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public headers: any;
  public data: any;

  constructor(private httpClient: HttpClient) { }

  public getEmployeeData(pageNo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.get(environment.localPortal+'employee/getEmployeeData?pageNo='+pageNo,httpOptions);
  }

  public deleteEmployeeData(empNo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.delete(environment.localPortal+'employee/deleteEmployee?emp_no='+empNo,httpOptions);
  }

  public addEmployee(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.post(environment.localPortal+'employee/addEmployee',data,httpOptions);
  }

  public getEmployeeDataByEmpNo(empNo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.get(environment.localPortal+'employee/getEmployeeData?empNo='+empNo,httpOptions);
  }

  public updateEmployee(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.post(environment.localPortal+'employee/updateEmployee',data,httpOptions);
  }

  public getEmployeeDataByFirstName(firstName: any,pageNo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        token: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.httpClient.get(environment.localPortal+'employee/getEmployeeData?pageNo='+pageNo+'&firstName='+firstName,httpOptions);
  }

}
