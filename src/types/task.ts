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
	list_id: string
	order: number
	user_id: string
	date: string
}
