import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../models/task.create.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(leadId: number) {
    return this.http.get<Task[]>(`${this.api}/getTasks`, {
      params: { leadId }
    });
  }

  getById(id: number) {
    return this.http.get<Task>(`${this.api}/getTaskById`, {
      params: { id }
    });
  }

  create(task: CreateTaskDto, leadId: number) {
    return this.http.post(`${this.api}/createTask`, task, { params: { leadId } });
  }

  update(task: Task) {
    return this.http.put(`${this.api}/updateTask`, task);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/deleteTask`, {
      params: { id }
    });
  }
}