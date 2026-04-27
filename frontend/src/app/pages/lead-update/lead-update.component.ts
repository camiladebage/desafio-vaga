import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../../core/services/lead.service';
import { Lead } from '../../core/models/lead.model';
import { CreateLeadDto } from '../../core/models/lead.create.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-lead-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead-update.component.html'
})
export class LeadUpdateComponent implements OnInit {
  id: number | null = null;
  name = '';
  email = '';
  status: 'New' | 'Qualified' | 'Won' | 'Lost' = 'New';
  leadData: Lead | null = null; 

  private statusToNumber: Record<string, number> = {
    'New': 0,
    'Qualified': 1,
    'Won': 2,
    'Lost': 3
  };

  constructor(
    private service: LeadService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.id) {
      this.loadLead();
    } else {
      this.router.navigate(['/leads']);
    }
  }

  loadLead(): void {
    if (!this.id) {
      this.router.navigate(['/leads']);
      return;
    }

    this.service.getById(this.id!).subscribe({
      next: (lead: Lead) => {
        this.leadData = lead; 
        this.name = lead.name;
        this.email = lead.email;
        this.id = lead.id;
        this.status = this.getStatusText(lead.status) as 'New' | 'Qualified' | 'Won' | 'Lost';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar lead:', err);
        alert('Erro ao carregar dados do lead. Redirecionando...');
        this.router.navigate(['/leads']);
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

  update(): void {
    if (!this.name || !this.email) {
      alert('Preencha todos os campos');
      return;
    }

    const updateData: Partial<Lead> = {
      name: this.name,
      email: this.email,
      id: this.id ?? undefined,
      status: this.statusToNumber[this.status]
    };

    this.service.update(updateData as Lead).subscribe({
     next: () => {
        this.notificationService.success('Lead criado com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/leads']);
        }, 6000);
      },
      error: (err) => {
        if (err.error) {
          console.error('📦 Corpo do erro (backend):', err.error);
          console.error('📄 Message do backend:', err.error?.message);
          console.error('📄 Details:', err.error?.details);
        }

        const errorMsg = err.error?.message || 'Erro ao salvar lead. Tente novamente.';
        this.notificationService.error(errorMsg);
      }
    });
  }
  
  cancel(): void {
    this.router.navigate(['/leads']);
  }
}