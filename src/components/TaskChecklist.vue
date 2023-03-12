<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { Task, ChecklistItem } from '@/types'
import { addToast } from '@/composables/toast'
import { useTasks } from '@/stores/task'
import TaskChecklistItem from '@/components/TaskChecklistItem.vue'

const props = defineProps<{
	item: Task
}>()
const task = useTasks()
const checklists = ref<ChecklistItem[]>(props.item.checklists)
watch(
	() => props.item.checklists,
	() => (checklists.value = props.item.checklists)
)
const completedItems = computed(() => checklists.value.filter(e => e.completed))
const completedPercent = computed(() => {
	if (!checklists.value.length) return 0
	return Math.ceil((completedItems.value.length / checklists.value.length) * 100)
})
const completedText = computed(() => `${completedItems.value.length}/${checklists.value.length}`)
const content = ref('')
const adding = ref(false)
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
}

function onItemUpdated(item: ChecklistItem) {
	checklists.value = checklists.value.map(e => {
		return e.id === item.id ? item : e
	})
}
</script>
<template>
	<div class="mb-2 flex items-center gap-3">
		<div class="text-sm text-gray-400">{{ completedPercent }}%</div>
		<div class="relative flex-1">
			<div
				class="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
				:style="{ width: `${completedPercent}%` }"
			></div>
			<div class="h-2 w-full bg-gray-200 rounded-full"></div>
		</div>
	</div>
	<div v-if="checklists.length">
		<TaskChecklistItem
			:item="checklist"
			v-for="checklist in checklists"
			:key="checklist.id"
			@updated="onItemUpdated"
			@deleted="onItemDeleted"
		/>
	</div>
	<div class="py-1 flex items-center gap-2">
		<div class="w-[13px] h-[13px] rounded-sm border border-dotted border-gray-500"></div>
		<input
			v-model.trim="content"
			class="md:text-sm w-full outline-none transition text-gray-600"
			placeholder="Add a new item"
			@keypress.enter.prevent="addItem"
		/>
	</div>
</template>
