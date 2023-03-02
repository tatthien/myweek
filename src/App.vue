<template>
	<div class="font-inter flex flex-col px-4 py-8 h-full bg-gray-50">
		<AppHeader />
		<main class="flex-1 h-full">
			<div class="lg:grid h-full grid-cols-6 gap-4">
				<TaskList
					v-for="(weekday, index) in weekdays"
					:key="index"
					:date="weekday"
					:list-id="format(weekday, 'ddMMyyyy')"
					class="mb-4 lg:mb-0"
				/>
				<div class="todo-group">
					<TaskList :date="saturday" :list-id="format(saturday, 'ddMMyyyy')" />
					<TaskList :date="sunday" :list-id="format(sunday, 'ddMMyyyy')" />
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { addDays, subDays, startOfWeek, format } from 'date-fns'
import { saturday, sunday, weekdays } from './composables/date'
import useTasks from './services/task/state'
import TaskList from './components/TaskList.vue'
import AppHeader from './components/AppHeader.vue'

const store = useTasks()
store.fetchTasks()
</script>

<style>
body,
html,
#app {
	height: 100%;
}

.todo-group {
	display: grid;
	grid-template-rows: minmax(210px, max-content) minmax(210px, auto);
	grid-row-gap: 1rem;
}
</style>
