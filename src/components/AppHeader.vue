<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, Cog8ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { firstDateOfWeek, goToNextWeek, goToPrevWeek, jumpToCurrentWeek } from '@/composables/date'
import { supabase } from '@/composables/supabase'
import { useUser } from '@/stores/user'
import ModalSettings from '@/components/ModalSettings.vue'

const user = useUser()
const currentMonth = computed(() => format(firstDateOfWeek.value, 'MMM Y'))
const showDropdown = ref(false)
const openModal = ref(false)

function openSettings() {
	// @TODO: using Dropdown component
	openModal.value = true
	showDropdown.value = false
}

async function signOut() {
	const { error } = await supabase.auth.signOut()
}
</script>
<template>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-6">
			<h1 class="text-xl font-medium">
				<a href="#" @click="jumpToCurrentWeek">{{ currentMonth }}</a>
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
		<div v-click-outside="() => (showDropdown = false)" class="relative z-10">
			<button class="hover:bg-gray-100 px-2 py-1 rounded-md transition" @click="showDropdown = !showDropdown">
				<span class="text-gray-400">Hi</span> <span class="font-medium">{{ user.firstName }}</span>
			</button>
			<Transition name="dropdown">
				<nav
					v-if="showDropdown"
					class="absolute right-0 mt-2 py-2.5 w-[200px] bg-white border border-gray-150 shadow rounded-md"
				>
					<div class="px-4 py-2 mb-2 border-b">
						<h2 class="font-medium">
							{{ user.fullName }}
						</h2>
						<div class="text-gray-400 text-sm truncate">
							{{ user.email }}
						</div>
					</div>
					<a
						href="#"
						class="mx-2 px-2 py-2 rounded flex items-center text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
						@click.prevent="openSettings"
					>
						<Cog8ToothIcon class="w-5 h-5 stroke-1.5 mr-2" />
						Settings</a
					>
					<a
						href="#"
						class="mx-2 px-2 py-2 rounded flex items-center text-gray-500 text-sm hover:bg-gray-100 hover:text-gray-900 transition"
						@click.prevent="signOut"
					>
						<ArrowRightOnRectangleIcon class="w-5 h-5 stroke-1.5 mr-2" />
						Log out</a
					>
				</nav>
			</Transition>
		</div>
		<Teleport to="body">
			<ModalSettings :open="openModal" @close="openModal = false" />
		</Teleport>
	</header>
</template>
