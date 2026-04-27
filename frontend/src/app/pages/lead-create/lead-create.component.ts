import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadService } from '../../core/services/lead.service';
import { CreateLeadDto } from '../../core/models/lead.create.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-lead-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead-create.component.html'
})
export class LeadCreateComponent {
  name = '';
  email = '';
  status: 'New' | 'Qualified' | 'Won' | 'Lost' = 'New';
  isLoading = false;

  private statusToNumber: Record<string, number> = {
    'New': 0,
    'Qualified': 1,
    'Won': 2,
    'Lost': 3
  };

  constructor(
    private service: LeadService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  save() {
    if (!this.name || !this.email) {
      this.notificationService.error('Preencha todos os campos');
      return;
    }

    this.isLoading = true;

    const newLead: Partial<CreateLeadDto> = {
      name: this.name,
      email: this.email,
      status: this.statusToNumber[this.status]
    };

    console.log('Enviando lead:', newLead);

    this.service.create(newLead as CreateLeadDto).subscribe({
      next: () => {
        this.notificationService.success('Lead criado com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/leads']);
        }, 6000);
      },
      error: (err) => {
        console.error('Erro ao salvar lead:', err);
        const errorMsg = err.error?.message || 'Erro ao salvar lead. Tente novamente.';
        this.notificationService.error(errorMsg);
        this.isLoading = false;
      }
    });
  }
  
  cancel() {
    this.router.navigate(['/leads']);
  }
}