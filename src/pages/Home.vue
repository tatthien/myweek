<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { saturday, sunday, weekdays } from '@/composables/date'
import { useTasks } from '@/stores/task'
import TaskList from '@/components/TaskList.vue'
import AppHeader from '@/components/AppHeader.vue'

const store = useTasks()
store.fetchTasks()

const grid = ref<HTMLElement>()

onMounted(() => {
	const todayList = document.getElementById(`list-${format(new Date(), 'yyyy-MM-dd')}`)
	if (grid.value) {
		grid.value.scrollTo({ top: 0, left: todayList?.offsetLeft - 40, behavior: 'smooth' })
	}
})
</script>
<template>
	<div class="font-inter h-full">
		<AppHeader class="py-6 px-4" />
		<main class="flex-1 md:h-[calc(100%-80px)]">
			<div
				ref="grid"
				class="px-2 pb-2 md:pb-0 md:px-0 space-y-2 md:space-y-0 snap-x md:grid md:grid-cols-[repeat(7,minmax(300px,350px))] min-h-full md:pb-12 overflow-auto"
			>
				<TaskList
					v-for="(weekday, index) in weekdays"
					:key="index"
					:date="weekday"
					:list-id="format(weekday, 'yyyy-MM-dd')"
					class="md:snap-center md:first:ml-4 md:first:mr-1 md:last:mr-4 md:last:ml-1 mx-1"
				/>
			</div>
		</main>
	</div>
</template>

<style scoped>
.todo-group {
	display: grid;
	grid-template-rows: minmax(auto, max-content) minmax(auto, max-content);
	grid-row-gap: 1rem;
}
</style>
