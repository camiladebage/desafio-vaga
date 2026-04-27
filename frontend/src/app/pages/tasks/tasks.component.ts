import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  leadId: number = 0;

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.leadId = Number(this.route.snapshot.paramMap.get('leadId'));
    this.load();
  }

  load() {
    this.service.getTasks(this.leadId)
      .subscribe({
        next: (res) => {
          this.tasks = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar tasks:', err);
        }
      });
  }

  getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
      0: 'Todo',
      1: 'Doing',
      2: 'Done'
    };
    return statusTexts[status] || 'Unknown';
  }

  getStatusClass(status: number): string {
    const statusClasses: Record<number, string> = {
      0: 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-gray-800',
      1: 'px-2 py-1 rounded-full text-xs bg-blue-100 text-yellow-800',
      2: 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800',
    };
    return statusClasses[status] || 'px-2 py-1 rounded-full text-xs bg-gray-100';
  }

  adjustDate(date: string | Date): Date {
    const d = new Date(date);
    d.setHours(d.getHours() - 3);
    return d;
  }

  back() {
    this.router.navigate(['/leads']);
  }
}