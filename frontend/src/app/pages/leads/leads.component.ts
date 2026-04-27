import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Lead } from '../../core/models/lead.model';
import { CommonModule } from '@angular/common';
import { LeadService } from '../../core/services/lead.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leads.component.html',
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];
  search = '';
  status = '';

  constructor(
    private service: LeadService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getLeads(this.search, this.status)
      .subscribe({
        next: (res) => {
          this.leads = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar leads:', err);
        }
      });
  }


  getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
      0: 'New',
      1: 'Qualified',
      2: 'Won',
      3: 'Lost'
    };
    return statusTexts[status] || 'Unknown';
  }

  getStatusClass(status: number): string {
    const statusClasses: Record<number, string> = {
      0: 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800',
      1: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800',
      2: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800',
      3: 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'px-2 py-1 rounded-full text-xs bg-gray-100';
  }

  adjustDate(date: string | Date): Date {
    const d = new Date(date);
    d.setHours(d.getHours() - 3);
    return d;
  }

  editLead(id: number): void {
    this.router.navigate(['/lead-update', id]);
  }

  deleteLead(id: number): void {
    this.router.navigate(['/lead-delete', id]);
  }

  viewTasks(leadId: number): void {
    this.router.navigate(['/task', leadId]);
  }

  createLead() {
    this.router.navigate(['/lead-create']);
  }

  createTask(leadId: number) {
    this.router.navigate(['/task-create', leadId]);
  }
}