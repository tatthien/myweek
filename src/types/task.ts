import { Label } from './label'

export enum TaskStatus {
	Active = 'active',
	Done = 'done',
}

export interface Task {
	id: string
	title: string
	description?: string
	color: string
	status: TaskStatus
	order: number
	user_id: string
	date: string
	checklists: ChecklistItem[]
	labels: Label[]
}

export interface ChecklistItem {
	id: string
	content: string
	completed: boolean
	order: number
	user_id: string
	task_id: string
}
