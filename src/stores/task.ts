import { Task } from '@/types'
import { defineStore } from 'pinia'
import { supabase } from '@/composables/supabase'

interface TaskState {
	tasks: Task[]
}

const defaultSelect = 'id,status,title,description,list_id,color,order,user_id'

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
		tasksByListId(state) {
			return (listId: string) => state.tasks.filter(task => task.list_id === listId)
		},
	},
	actions: {
		async fetchTasks() {
			const { data: tasks, error } = await supabase.from('tasks').select(defaultSelect)
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
	},
})

export default useTasks
