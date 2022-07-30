import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceNote } from '../models/ServiceNote';

@Injectable({
  providedIn: 'root',
})
export class ServiceNoteService {
  apiUrl = 'https://localhost:44381/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  GetServiceNote(GetServiceNote: ServiceNote) {
    return this.httpClient.post(
      `${this.apiUrl}ServiceNoteController/GetServiceNOte`,
      GetServiceNote,
      this.httpOptions
    );
  }

  DeleteServiceNote(DeleteServiceNote: ServiceNote) {
    return this.httpClient.delete<ServiceNote>(
      `${this.apiUrl}ServiceNOteController/DeleteServiceNote`
    );
  }
}
