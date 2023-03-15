import { defineStore } from 'pinia'
import { supabase } from '@/composables/supabase'
import { ChecklistItem } from '@/types'

const defaultSelect = 'id,content,completed,order,user_id'

export const useChecklist = defineStore({
	id: 'checklist',
	state() {
		return {
			checklists: [],
		}
	},
	actions: {
		async create(payload: ChecklistItem) {
			const { data, error } = await supabase
				.from('checklists')
				.insert({
					content: payload.content,
					task_id: payload.task_id,
					user_id: payload.user_id,
					completed: false,
					order: payload.order,
				})
				.select(defaultSelect)
			if (error) throw error
			return data
		},
		async update(id: string, payload: ChecklistItem) {
			const { error } = await supabase.from('checklists').update(payload).eq('id', id).select(defaultSelect)
			if (error) throw error
		},
		async delete(id: string) {
			const { error } = await supabase.from('checklists').delete().eq('id', id)
			if (error) throw error
		},
		async upsert(payload: any) {
			const { error } = await supabase.from('checklists').upsert(payload)
			if (error) throw error
		},
	},
})
