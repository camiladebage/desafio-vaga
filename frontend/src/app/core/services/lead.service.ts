import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lead } from '../../core/models/lead.model';
import { CreateLeadDto } from '../../core/models/lead.create.model';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private api = 'http://localhost:5000/api/leads';

  constructor(private http: HttpClient) {}

  getLeads(search?: string, status?: string) {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);

    return this.http.get<Lead[]>(`${this.api}`, { params });
  }

  getById(id: number) {
    return this.http.get<Lead>(`${this.api}/getLeadsById`, {
      params: { id }
    });
  }

  create(lead: CreateLeadDto) {
    return this.http.post(`${this.api}/createLeads`, lead);
  }

  update(lead: CreateLeadDto) {
    return this.http.put(`${this.api}/updateLeads`, lead);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/deleteLeads`, {
      params: { id }
    });
  }
}