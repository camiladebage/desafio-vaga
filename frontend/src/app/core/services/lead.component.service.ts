import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private api = 'http://localhost:5000/api/leads';

  constructor(private http: HttpClient) {}

  getLeads(search?: string, status?: string) {
    return this.http.get<Lead[]>(this.api, {
      params: { search: search || '', status: status || '' }
    });
  }

  create(lead: any) {
    return this.http.post(this.api, lead);
  }
}