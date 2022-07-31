import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apiUrl = 'https://localhost:44381/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  GetTeam(GetTeam: Team){
    return this.httpClient.post(`${this.apiUrl}TeamController/GetTeam`,GetTeam, this.httpOptions)
  }

  DeleteTeam(DeleteTeam: Team){
    return this.httpClient.delete<Team>(`${this.apiUrl}TeamController/DeleteTeam`)
  }

  CreateTeam(CreateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}TeamController/CreateTeam`,CreateTeam, this.httpOptions)
  }

  
  UpdateTeam(UpdateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}TeamController/CreateTeam`,UpdateTeam, this.httpOptions)
  }

}