export interface CreateTaskDto {
  id: number;
  leadId: number;
  title: string;
  dueDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}