<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { saturday, sunday, weekdays } from '@/composables/date'
import { useTasks } from '@/stores/task'
import { useLabel } from '@/stores/label'
import TaskList from '@/components/TaskList.vue'
import AppHeader from '@/components/AppHeader.vue'

const taskStore = useTasks()
const labelStore = useLabel()

taskStore.fetchList()
labelStore.fetch()

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
		<main class="flex-1 lg:h-[calc(100%-80px)]">
			<div
				ref="grid"
				class="px-2 pb-2 lg:pb-0 lg:px-0 space-y-2 lg:space-y-0 lg:snap-x lg:grid lg:grid-cols-[repeat(6,1fr)] min-h-full lg:pb-12 overflow-auto"
			>
				<TaskList
					v-for="(weekday, index) in weekdays"
					:key="index"
					:date="weekday"
					:list-id="format(weekday, 'yyyy-MM-dd')"
					class="lg:snap-center lg:first:ml-4 lg:first:mr-1 mx-1"
				/>
				<div class="todo-group mx-1 lg:mr-4 lg:ml-1">
					<TaskList key="saturday" :date="saturday" :list-id="format(saturday, 'yyyy-MM-dd')" />
					<TaskList key="sunday" :date="sunday" :list-id="format(sunday, 'yyyy-MM-dd')" />
				</div>
			</div>
		</main>
	</div>
</template>

<style scoped>
.todo-group {
	display: grid;
	grid-template-rows: minmax(auto, max-content) minmax(auto, max-content);
	grid-row-gap: 0.5rem;
}
</style>
