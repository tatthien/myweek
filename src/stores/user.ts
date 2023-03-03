import { defineStore } from 'pinia'
import { User } from '@/types'

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
	},
})

export default useUser
