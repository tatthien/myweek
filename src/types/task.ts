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
}

export interface ChecklistItem {
	id: string
	content: string
	completed: boolean
}
