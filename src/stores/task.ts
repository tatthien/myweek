import { ChecklistItem, Task } from '@/types'
import { defineStore } from 'pinia'
import { supabase } from '@/composables/supabase'

interface TaskState {
	tasks: Task[]
}

const defaultSelect = `id,status,title,description,color,order,user_id,date,checklists(id,content,completed,order,user_id)`
const defaultChecklistSelect = 'id,content,completed,order,user_id'

export const useTasks = defineStore({
	id: 'tasks',
	state(): TaskState {
		return {
			tasks: [],
		}
	},
	getters: {
		allTasks(state): Task[] {
			return state.tasks
		},
	},
	actions: {
		async fetchTasks() {
			const { data: tasks, error } = await supabase
				.from('tasks')
				.select(defaultSelect)
				.order('order', { foreignTable: 'checklists', ascending: true })
			if (error) throw error
			this.tasks = tasks
		},
		async create(task: Task) {
			const { data, error } = await supabase.from('tasks').insert(task).select(defaultSelect)
			if (error) throw error
			if (data) {
				this.tasks = [...this.tasks, data[0]]
			}
		},
		async update(id: string, task: Task) {
			const { error } = await supabase.from('tasks').update(task).eq('id', id).select(defaultSelect)
			if (error) throw error
			this.tasks = this.tasks.map(t => {
				if (t.id === id) {
					return { ...t, ...task }
				}
				return t
			})
		},
		async upsert(tasks: any) {
			const { error } = await supabase.from('tasks').upsert(tasks)
			if (error) throw error
		},
		async delete(id: string) {
			const { error } = await supabase.from('tasks').delete().eq('id', id)
			if (error) throw error
			this.tasks = this.tasks.filter(t => t.id !== id)
		},
		async addChecklistItem(task: Task, content: string) {
			const { data, error } = await supabase
				.from('checklists')
				.insert({
					content: content,
					task_id: task.id,
					user_id: task.user_id,
					completed: false,
					order: task.checklists.length + 1,
				})
				.select(defaultChecklistSelect)
			if (error) throw error
			return data
		},
		async updateChecklistItem(id: string, item: ChecklistItem) {
			const { error } = await supabase.from('checklists').update(item).eq('id', id).select(defaultChecklistSelect)
			if (error) throw error
		},
		async deleteChecklistItem(id: string) {
			const { error } = await supabase.from('checklists').delete().eq('id', id)
			if (error) throw error
		},
		async upsertChecklistItems(checklist: any) {
			const { error } = await supabase.from('checklists').upsert(checklist)
			if (error) throw error
		},
	},
})

export default useTasks
