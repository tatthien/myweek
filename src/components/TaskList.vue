<template>
	<div>
		<div class="bg-gray-100 rounded-md px-2">
			<header class="flex items-center gap-2 py-2">
				<slot name="header">
					<span class="font-semibold">{{ dateOfMonth }}</span>
					<span class="text-gray-400">{{ dateOfWeek }}</span>
					<span v-if="isToday" class="w-2 h-2 bg-blue-400 rounded-full" />
				</slot>
			</header>
			<div>
				<Draggable
					v-model="tasks"
					v-bind="dragOptions"
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
				>
					<template #item="{ element }">
						<TaskItem :key="element.id" :item="element" class="my-1.5" />
					</template>
				</Draggable>

				<textarea
					v-if="showAddTaskInput"
					v-model="taskName"
					v-focus
					v-auto-resize
					class="block h-[40px] outline-none border resize-none rounded-md w-full md:text-sm px-2 py-2 my-1.5 overflow-y-hidden"
					placeholder="Type task name..."
					@keypress.enter.prevent="onCreateTask"
					@blur="onBlurTaskInput"
				/>

				<button
					class="text-sm inline-flex items-center px-2 py-2 font-medium rounded-md text-gray-700 transition w-full mb-2 hover:bg-gray-200"
					@click="addNew"
				>
					<PlusSmallIcon class="w-5 h-5 mr-1" />
					<span>New</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, toRef, ref } from 'vue'
import { format } from 'date-fns'
import { TaskStatus } from '@/types'
import { useTasks } from '@/stores/task'
import { useUser } from '@/stores/user'
import TaskItem from './TaskItem.vue'
import Draggable from 'vuedraggable'
import { PlusSmallIcon } from '@heroicons/vue/24/outline'
import { addToast } from '@/composables/toast'

const props = defineProps<{
	date: Date
	listId: string
}>()

const store = useTasks()
const user = useUser()

const date = toRef(props, 'date')
const listId = toRef(props, 'listId')
const tasks = computed({
	get: () => {
		return store.tasks
			.filter(task => task.list_id === listId.value)
			.sort((a, b) => {
				return a.order - b.order
			})
	},
	set: async tasks => {
		try {
			tasks.forEach((task, index) => {
				task.list_id = listId.value
				task.order = index
			})
			await store.upsert(tasks)
		} catch (error) {
			addToast('error', error.message)
		}
	},
})
const showAddTaskInput = ref(false)
const tasksCount = computed(() => tasks.value.length)
const taskName = ref('')
const drag = ref(false)

function addNew() {
	showAddTaskInput.value = true
}

async function onCreateTask() {
	try {
		const task = {
			title: taskName.value,
			color: 'transparent',
			status: TaskStatus.Active,
			list_id: listId.value,
			user_id: user.id,
			order: tasksCount.value + 1,
		}
		store.create(task)
		taskName.value = ''
	} catch (error) {
		addToast('error', error.message)
	}
}

function onBlurTaskInput() {
	taskName.value = ''
	showAddTaskInput.value = false
}

function onStartDragging() {
	drag.value = true
}

function onEndDragging() {
	drag.value = false
}

const dateOfWeek = date.value ? computed(() => format(date.value, 'E')) : null
const dateOfMonth = date.value ? computed(() => format(date.value, 'dd')) : null
const isToday = computed(() => (date.value ? format(date.value, 'ddMMyyyy') === format(new Date(), 'ddMMyyyy') : false))
const dragOptions = {
	animation: 200,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost',
}
</script>

<style>
.ghost {
	@apply bg-blue-100 border-blue-600;
}
</style>
