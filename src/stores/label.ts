import { defineStore } from 'pinia'
import { supabase } from '@/composables/supabase'
import { Label } from '@/types'

const defaultSelect = 'id,title,color,user_id'

export const useLabel = defineStore({
	id: 'label',
	state() {
		return {
			labels: [] as Label[],
		}
	},
	actions: {
		async fetch() {
			const { data, error } = await supabase
				.from('labels')
				.select(defaultSelect)
				.order('created_at', { ascending: true })
			if (error) throw error
			this.labels = data
		},
		async create(payload: Label) {
			const { data, error } = await supabase.from('labels').insert(payload).select(defaultSelect)
			if (error) throw error
		},
		async update(id: string, payload: Label) {
			const { error } = await supabase.from('labels').update(payload).eq('id', id).select(defaultSelect)
			if (error) throw error
		},
		async delete(id: string) {
			const { error } = await supabase.from('labels').delete().eq('id', id)
			if (error) throw error
		},
		async upsert(payload: any) {
			const { error } = await supabase.from('labels').upsert(payload)
			if (error) throw error
		},
	},
})
