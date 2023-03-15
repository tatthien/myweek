<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, ref, watch } from 'vue'
import { IconSettings, IconSquareArrowRight, IconChevronRight, IconChevronLeft, IconCalendar } from '@tabler/icons-vue'
import { firstDateOfWeek, goToNextWeek, goToPrevWeek, jumpToCurrentWeek, setFirstDateOfWeek } from '@/composables/date'
import { supabase } from '@/composables/supabase'
import { useUser } from '@/stores/user'
import ModalSettings from '@/components/ModalSettings.vue'
import { addToast } from '@/composables/toast'
import { DatePicker } from 'v-calendar'

const user = useUser()
const currentMonth = computed(() => format(firstDateOfWeek.value, 'MMM Y'))
const showDropdown = ref(false)
const openModal = ref(false)
const showCalendar = ref(false)
const date = ref(new Date())

function openSettings() {
	openModal.value = true
	showDropdown.value = false
}

async function signOut() {
	const { error } = await supabase.auth.signOut()
	if (error) {
		addToast('error', error.message)
	}
}

watch(
	() => date.value,
	newVal => {
		setFirstDateOfWeek(newVal)
	}
)
</script>
<template>
	<header class="flex items-center justify-between">
		<div class="flex items-center gap-6">
			<h1 class="text-xl font-medium">
				<a href="#" @click="jumpToCurrentWeek">{{ currentMonth }}</a>
			</h1>
			<div class="flex items-center gap-2">
				<div v-click-outside="() => (showCalendar = false)" class="relative inline-flex">
					<button
						class="inline-flex rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition"
						@click="showCalendar = !showCalendar"
					>
						<IconCalendar size="24" />
					</button>
					<DatePicker
						v-if="showCalendar"
						v-model="date"
						class="absolute z-10 top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
						is-required
						:first-day-of-week="2"
						@dayclick="showCalendar = false"
					/>
				</div>
				<button
					class="inline-flex rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition"
					@click="goToPrevWeek"
				>
					<IconChevronLeft size="24" />
				</button>
				<button
					class="inline-flex rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition"
					@click="goToNextWeek"
				>
					<IconChevronRight size="24" />
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
						class="mx-2 px-2 py-2 rounded flex items-center gap-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
						@click.prevent="openSettings"
					>
						<IconSettings size="16" />
						Settings</a
					>
					<a
						href="#"
						class="mx-2 px-2 py-2 rounded flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-100 hover:text-gray-900 transition"
						@click.prevent="signOut"
					>
						<IconSquareArrowRight size="16" />
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
