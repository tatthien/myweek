export enum TaskStatus {
  Active = 'active',
  Done = 'done',
}

export interface Task {
  id: string
  content: string
  date: Date
  color: string
  status: TaskStatus,
  listId: string,
}
