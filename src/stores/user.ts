import { defineStore } from 'pinia'
import { User } from '@/types'
import { supabase } from '@/composables/supabase'

interface UserState {
	user: User | null
}

export const useUser = defineStore({
	id: 'user',
	state(): UserState {
		return {
			user: null,
		}
	},
	getters: {
		isAuthenticated(): boolean {
			return this.user !== null
		},
		id(state): string {
			return String(state.user?.id)
		},
		firstName(state): string {
			return state.user?.user_metadata?.firstName
		},
		lastName(state): string {
			return state.user?.user_metadata?.lastName
		},
		fullName(): string {
			return this.firstName + ' ' + this.lastName
		},
		email(state): string {
			return String(state.user?.email)
		},
	},
	actions: {
		setUser(user: User) {
			this.user = user
		},
		async update(user: Partial<User>) {
			const { data, error } = await supabase.auth.updateUser(user)
			if (error) throw error
			if (data) {
				this.setUser(data)
			}
		},
		async updateMeta(metadata: Record<string, unknown>) {
			const { error } = await supabase.auth.updateUser({ data: metadata })
			if (error) throw error
		},
	},
})

export default useUser
