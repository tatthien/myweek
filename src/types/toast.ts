export type Toast = {
	id: string | number
	type: 'success' | 'error'
	title: string
	content?: string
	error?: Record<string, any>
}
