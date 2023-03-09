<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { firstDateOfWeek, goToNextWeek, goToPrevWeek } from '@/composables/date'
import { supabase } from '@/composables/supabase'
import { useUser } from '@/stores/user'

const user = useUser()
const currentMonth = computed(() => format(firstDateOfWeek.value, 'MMM Y'))
const showDropdown = ref(false)

async function signOut() {
	const { error } = await supabase.auth.signOut()
}
</script>
<template>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-6">
			<h1 class="text-xl font-medium">
				{{ currentMonth }}
			</h1>
			<div class="flex items-center gap-2">
				<button class="inline-flex rounded hover:bg-gray-200" @click="goToPrevWeek">
					<ChevronLeftIcon class="w-5 h-5 text-gray-400" />
				</button>
				<button class="inline-flex rounded hover:bg-gray-200" @click="goToNextWeek">
					<ChevronRightIcon class="w-5 h-5 text-gray-400" />
				</button>
			</div>
		</div>
		<div v-click-outside="() => (showDropdown = false)" class="relative">
			<button class="hover:bg-gray-100 px-2 py-1 rounded-md transition" @click="showDropdown = !showDropdown">
				<span class="text-gray-400">Hi</span> <span class="font-medium">{{ user.firstName }}</span>
			</button>
			<Transition name="dropdown">
				<nav
					v-if="showDropdown"
					class="absolute right-0 mt-2 py-2.5 w-[200px] bg-white border border-gray-150 shadow rounded-md"
				>
					<div class="px-4 py-2">
						<h2 class="font-medium">
							{{ user.fullName }}
						</h2>
						<div class="text-gray-400 text-sm truncate">
							{{ user.email }}
						</div>
					</div>
					<a
						href="#"
						class="border-b px-4 py-2 flex text-gray-900 text-sm hover:bg-gray-100 transition"
						@click="signOut"
						>Account</a
					>
					<a href="#" class="px-4 py-2 flex text-gray-900 text-sm hover:bg-gray-100 transition" @click="signOut"
						>Preferences</a
					>
					<a href="#" class="px-4 py-2 flex text-gray-900 text-sm hover:bg-gray-100 transition" @click="signOut"
						>Log out</a
					>
				</nav>
			</Transition>
		</div>
	</header>
</template>
