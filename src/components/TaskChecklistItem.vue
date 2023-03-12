<script lang="ts" setup>
import { ref } from 'vue'
import { ChecklistItem } from '@/types'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useTasks } from '@/stores/task'
const props = defineProps<{
	item: ChecklistItem
}>()
const emit = defineEmits(['updated', 'deleted'])
const task = useTasks()
const editing = ref(false)
const form = ref({
	content: props.item.content,
	completed: props.item.completed,
})
const content = ref(props.item.content)
async function update() {
	await task.updateChecklistItem(props.item.id, form.value)
	emit('updated', { ...props.item, ...form.value })
	editing.value = false
}
async function deleteItem() {
	await task.deleteChecklistItem(props.item.id)
	emit('deleted', props.item)
}
</script>
<template>
	<div
		class="group hover:bg-gray-100 hover:text-gray-900 -mx-2 px-2 py-1 rounded flex items-center gap-2 text-gray-600 cursor-pointer transition"
	>
		<input type="checkbox" v-model="form.completed" @change="update" :checked="form.completed" class="cursor-pointer" />
		<input
			v-if="editing"
			type="text"
			v-focus
			v-model.trim="form.content"
			@blur="editing = false"
			@keypress.enter.prevent="update"
			class="md:text-sm w-full border border-gray-300 rounded px-1 outline-none focus:border-gray-400 transition"
		/>
		<template v-else>
			<span
				:class="['block flex-1 md:text-sm', form.completed ? 'text-gray-400 line-through' : '']"
				@click="editing = true"
				>{{ item.content || 'Untitled' }}</span
			>
			<button
				class="md:hidden group-hover:inline-flex text-gray-600 hover:bg-gray-200 whitespace-nowrap items-center rounded p-0.5"
				@click.prevent="deleteItem"
			>
				<TrashIcon class="w-4 h-4 stroke-1.5 text-red-400" />
			</button>
		</template>
	</div>
</template>
