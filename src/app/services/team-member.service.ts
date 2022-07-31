import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee } from '../models/Employee';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  apiUrl = 'https://localhost:44381/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  GetTeamMember(GetEmployee: employee){
    return this.httpClient.post(`${this.apiUrl}EmployeeController/GetEmployee`,GetEmployee, this.httpOptions)
  }

  DeleteTeamMember(DeleteEmployee: employee){
    return this.httpClient.delete<employee>(`${this.apiUrl}EmployeeController/DeleteEmployee`)
  }

  CreateTeamMember(CreateEmployee: employee){

    return this.httpClient.post<employee>(`${this.apiUrl}EmployeeController/CreateEmployee`,CreateEmployee, this.httpOptions)
  }
  
  UpdateTeamMember(UpdateEmployee: employee){

    return this.httpClient.post<employee>(`${this.apiUrl}EmployeeController/CreateEmployee`,UpdateEmployee, this.httpOptions)
  }

}
