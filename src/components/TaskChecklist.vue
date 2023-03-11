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
const completedPercent = computed(() => (completedItems.value.length / checklists.value.length) * 100)
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
	<div class="mb-2" v-if="checklists.length">
		<TaskChecklistItem
			:item="checklist"
			v-for="checklist in checklists"
			:key="checklist.id"
			@updated="onItemUpdated"
			@deleted="onItemDeleted"
		/>
	</div>
	<div class="flex items-center gap-2">
		<input
			v-model.trim="content"
			class="md:text-sm w-full border border-gray-300 rounded-md px-2 h-[32px] outline-none focus:border-gray-400 transition"
			placeholder="Add an item"
			@keypress.enter.prevent="addItem"
		/>
		<WButton variant="secondary" size="sm" :loading="adding" @click="addItem">Add</WButton>
	</div>
</template>
