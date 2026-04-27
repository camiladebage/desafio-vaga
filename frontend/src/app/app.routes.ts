// app.routes.ts
import { Routes } from '@angular/router';
import { LeadsComponent } from './pages/leads/leads.component';
import { LeadCreateComponent } from './pages/lead-create/lead-create.component';
import { LeadUpdateComponent } from './pages/lead-update/lead-update.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { LeadDeleteComponent } from './pages/lead-delete/lead-delete.component';

export const routes: Routes = [
  { path: 'leads', component: LeadsComponent },
  { path: 'lead-create', component: LeadCreateComponent },
  { path: 'lead-update/:id', component: LeadUpdateComponent },
  { path: 'lead-delete/:id', component: LeadDeleteComponent },
  { path: 'task/:leadId', component: TasksComponent },
  { path: 'task-create/:leadId', component: TaskCreateComponent },
  { path: '', redirectTo: '/leads', pathMatch: 'full' },
  { path: '**', redirectTo: '/leads' }
];