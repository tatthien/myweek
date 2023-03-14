<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { Task, ChecklistItem } from '@/types'
import { addToast } from '@/composables/toast'
import { useTasks } from '@/stores/task'
import TaskChecklistItem from '@/components/TaskChecklistItem.vue'
import Draggable from 'vuedraggable'

const props = defineProps<{
	item: Task
}>()
const task = useTasks()
const checklists = ref([...props.item.checklists])
watch(
	() => props.item.checklists,
	newVal => (checklists.value = newVal)
)
const completedItems = computed(() => checklists.value.filter(e => e.completed))
const completedPercent = computed(() => {
	if (!checklists.value.length) return 0
	return Math.ceil((completedItems.value.length / checklists.value.length) * 100)
})
const content = ref('')
const adding = ref(false)
const drag = ref(false)
async function addItem() {
	adding.value = true
	try {
		const data = await task.addChecklistItem(props.item, content.value)
		checklists.value.push(data[0])
		content.value = ''
	} catch (error: any) {
		addToast('error', error.message)
	}
	adding.value = false
}

function onItemDeleted(item: ChecklistItem) {
	checklists.value = checklists.value.filter(e => e.id !== item.id)
	task.fetchTasks() // @TODO: consider to emit a event or fetch new items
}

function onItemUpdated(item: ChecklistItem) {
	checklists.value = checklists.value.map(e => {
		return e.id === item.id ? item : e
	})
	task.fetchTasks() // @TODO: consider to emit a event or fetch new items
}

async function onDragEnd() {
	drag.value = false
	// Update order
	try {
		checklists.value.forEach((item, index) => {
			item.order = index
		})
		await task.upsertChecklistItems(checklists.value)
	} catch (error: any) {
		addToast('error', error.message)
	}
}
</script>
<template>
	<div class="mb-2 flex items-center gap-3">
		<div class="text-sm text-gray-400">{{ completedPercent }}%</div>
		<div class="relative flex-1">
			<div
				class="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
				:style="{ width: `${completedPercent}%` }"
			/>
			<div class="h-2 w-full bg-gray-200 rounded-full" />
		</div>
	</div>
	<div v-if="checklists.length">
		<Draggable
			v-model="checklists"
			v-bind="{
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			}"
			item-key="id"
			ghost-class="ghost"
			:component-data="{
				tag: 'div',
				type: 'transition-group',
				name: !drag ? 'flip-list' : null,
			}"
			:group="{ name: 'checklist', pull: true, put: true }"
			@start="drag = true"
			@end="onDragEnd"
		>
			<template #item="{ element }">
				<TaskChecklistItem :key="element.id" :item="element" @updated="onItemUpdated" @deleted="onItemDeleted" />
			</template>
		</Draggable>
	</div>
	<div class="py-1 flex items-center gap-2">
		<div class="w-[13px] h-[13px] rounded-sm border border-dotted border-gray-500" />
		<input
			v-model.trim="content"
			class="md:text-sm w-full outline-none transition text-gray-600"
			placeholder="Type item name & press ↵"
			@keypress.enter.prevent="addItem"
		/>
	</div>
</template>
