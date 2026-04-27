import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../../core/services/lead.service';
import { NotificationService } from '../../core/services/notification.service';
import { Lead } from '../../core/models/lead.model';

@Component({
  selector: 'app-lead-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead-delete.component.html'
})
export class LeadDeleteComponent implements OnInit {
  id: number | null = null;
  lead: Lead | null = null;

  constructor(
    private service: LeadService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.id) {
      this.router.navigate(['/leads']);
      return;
    }

    this.loadLead();
  }

  loadLead(): void {
    if (!this.id) return;

    this.service.getById(this.id).subscribe({
      next: (lead) => {
        this.lead = lead;
      },
      error: (err) => {
        console.error('Erro ao carregar lead:', err);
        this.notificationService.error('Erro ao carregar lead');
        this.router.navigate(['/leads']);
      }
    });
  }

  confirmDelete(): void {
    if (!this.id) return;

    this.service.delete(this.id).subscribe({
      next: () => {
        this.notificationService.success('Lead excluído com sucesso!');
        this.router.navigate(['/leads']);
      },
      error: (err) => {
        console.error('Erro ao deletar lead:', err);
        const errorMsg = err.error?.message || 'Erro ao excluir lead.';
        this.notificationService.error(errorMsg);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/leads']);
  }
}