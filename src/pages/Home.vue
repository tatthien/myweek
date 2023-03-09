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
	const todayList = document.getElementById(`list-${format(new Date(), 'ddMMyyyy')}`)
	if (grid.value) {
		grid.value.scrollTo({ top: 0, left: todayList?.offsetLeft - 40, behavior: 'smooth' })
	}
})
</script>
<template>
	<div class="font-inter h-full">
		<AppHeader class="py-6 px-4" />
		<main class="snap-x flex-1 h-[calc(100%-80px)]">
			<div ref="grid" class="grid grid-cols-[repeat(7,minmax(300px,350px))] min-h-full pb-12 overflow-auto">
				<TaskList
					v-for="(weekday, index) in weekdays"
					:key="index"
					:date="weekday"
					:list-id="format(weekday, 'ddMMyyyy')"
					class="snap-center first:ml-4 first:mr-1 last:mr-4 last:ml-1 mx-1"
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
