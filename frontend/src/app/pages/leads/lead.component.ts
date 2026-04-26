import { Component, OnInit } from '@angular/core';
import { Lead } from '../../core/models/lead.model';
import { LeadService } from '../../core/services/lead.component.service';

@Component({
  selector: 'app-leads',
  templateUrl: '../../pages/leads/lead.component.html',
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];
  search = '';
  status = '';

  constructor(private service: LeadService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getLeads(this.search, this.status)
      .subscribe(res => this.leads = res);
  }
}