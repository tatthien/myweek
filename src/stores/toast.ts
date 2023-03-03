import { defineStore } from 'pinia'
import { Toast } from '@/types'

export const useToastStore = defineStore({
	id: 'toastStore',
	state() {
		return {
			toasts: [] as Toast[],
		}
	},
	actions: {
		addItem(item: Toast) {
			this.toasts.unshift(item)
		},
		removeItem(id: string | number) {
			this.toasts = this.toasts.filter((item: Toast) => item.id !== id)
		},
	},
})
