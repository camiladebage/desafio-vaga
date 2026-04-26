export interface Lead {
  id: number;
  name: string;
  email: string;
  status: 'New' | 'Qualified' | 'Won' | 'Lost';
  createdAt: string;
  updatedAt: string;
  tasksCount: number;
}