<template>
	<div class="flex flex-col">
		<header class="flex items-center gap-2 py-2">
			<slot name="header">
				<span class="font-semibold">{{ dateOfMonth }}</span>
				<span class="text-gray-400">{{ dateOfWeek }}</span>
			</slot>
		</header>
		<div class="todo-body flex flex-col flex-1">
			<div class="">
				<input
					v-model="taskName"
					type="text"
					class="px-2 py-1.5 w-full outline-none border border-gray-150 rounded-lg"
					placeholder="Add a task"
					@keydown.enter="createTask"
				/>
			</div>
			<Draggable
				v-model="tasks"
				v-bind="dragOptions"
				class="min-h-full"
				item-key="id"
				ghost-class="ghost"
				:component-data="{
					tag: 'div',
					type: 'transition-group',
					name: !drag ? 'flip-list' : null,
				}"
				:group="{ name: 'task', pull: true, put: true }"
				@start="onStartDragging"
				@end="onEndDragging"
				@change="log"
			>
				<template #item="{ element }">
					<TaskItem
						:task="element"
						:key="element.id"
						class="px-2 py-2 my-2 bg-white rounded-lg border border-gray-150"
					/>
				</template>
			</Draggable>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, toRef, ref } from 'vue'
import { format } from 'date-fns'
import { Task, TaskStatus } from '../services/task/types'
import useTasks from '../services/task/state'
import TaskItem from './TaskItem.vue'
import Draggable from 'vuedraggable'

const props = defineProps<{
	date: Date
	listId: string
}>()

const store = useTasks()
const date = toRef(props, 'date')
const listId = toRef(props, 'listId')

const tasks = computed({
	get: () => {
		return store.allTasks
			.filter(task => task.listId === listId.value)
			.sort((a, b) => {
				return a.order - b.order
			})
	},
	set: tasks => {
		tasks.forEach((task, index) => {
			task.date = date.value
			task.listId = listId.value
			task.order = index

			store.update(task)
		})
	},
})

const taskName = ref('')

const createTask = () => {
	const task: Task = {
		id: Date.now().toString(),
		content: taskName.value,
		date: date.value,
		color: 'transparent',
		status: TaskStatus.Active,
		listId: listId.value,
		order: 1000,
	}

	store.create(task)

	taskName.value = ''
}

const drag = ref(false)

const onStartDragging = () => {
	drag.value = true
}

const onEndDragging = () => {
	drag.value = false
}

function log(value) {
	console.log(value)
}

const dateOfWeek = date.value ? computed(() => format(date.value, 'E')) : null
const dateOfMonth = date.value ? computed(() => format(date.value, 'dd')) : null
const dragOptions = {
	animation: 200,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost',
}
</script>

<style>
.flip-list-move {
	transition: transform 0.5s;
}
.no-move {
	transition: transform 0s;
}

.ghost {
	@apply bg-purple-100 border-purple-400;
}
</style>
