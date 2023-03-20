import { ChecklistItem, Task } from '@/types'
import { defineStore } from 'pinia'
import { supabase } from '@/composables/supabase'

interface TaskState {
	tasks: Task[]
}

const defaultSelect = `id,status,title,description,color,order,user_id,date,checklists(id,content,completed,order,user_id),tasks_labels(id,label_id),labels(id,title,color)`

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
		async fetchList() {
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
		},
		async update(id: string, task: Task) {
			const { error } = await supabase.from('tasks').update(task).eq('id', id).select(defaultSelect)
			if (error) throw error
		},
		async upsert(tasks: any) {
			const { error } = await supabase.from('tasks').upsert(tasks)
			if (error) throw error
		},
		async delete(id: string) {
			const { error } = await supabase.from('tasks').delete().eq('id', id)
			if (error) throw error
		},
	},
})

export default useTasks
