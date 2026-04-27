import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { LeadService } from '../../core/services/lead.service';
import { CreateTaskDto } from '../../core/models/task.create.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html'
})
export class TaskCreateComponent implements OnInit {
  title = '';
  leadId = 0;
  leadName = '';
  dueDate = '';
  status: 'Todo' | 'Doing' | 'Done' = 'Todo';

  private statusToNumber: Record<string, number> = {
    'Todo': 0,
    'Doing': 1,
    'Done': 2
  };

  constructor(
    private service: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private leadService: LeadService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leadId = +params['leadId'];

      if (this.leadId) {
        this.leadService.getById(this.leadId).subscribe({
          next: (lead) => {
            this.leadName = lead.name;
          },
          error: (err) => {
            console.error('Erro ao buscar lead:', err);
          }
        });
      }
    });
  }

  save() {
    if (!this.title || !this.dueDate || !this.leadId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const newTask: Partial<CreateTaskDto> = {
      title: this.title,
      dueDate: this.dueDate,
      leadId: this.leadId,
      status: this.statusToNumber[this.status]
    };

    console.log('Enviando task:', newTask);

    this.service.create(newTask as CreateTaskDto, this.leadId).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Erro ao salvar task:', err);
        alert('Erro ao salvar task. Tente novamente.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/leads']);
  }
}