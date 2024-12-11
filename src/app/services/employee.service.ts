import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/employees`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employees`, employee);
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/employees/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/employees/${id}`);
  }
}
