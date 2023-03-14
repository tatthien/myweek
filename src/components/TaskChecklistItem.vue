<script lang="ts" setup>
import { ref } from 'vue'
import { ChecklistItem } from '@/types'
import { IconTrash } from '@tabler/icons-vue'
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
		class="group hover:bg-gray-100 hover:text-gray-900 -mx-2 px-2 py-1 rounded flex items-center gap-2 text-gray-600 cursor-pointer"
	>
		<input v-model="form.completed" type="checkbox" :checked="form.completed" class="cursor-pointer" @change="update" />
		<input
			v-if="editing"
			v-model.trim="form.content"
			v-focus
			type="text"
			class="md:text-sm w-full outline-none transition bg-inherit"
			@blur="editing = false"
			@keypress.enter.prevent="update"
		/>
		<template v-else>
			<span
				:class="['block flex-1 md:text-sm', form.completed ? 'text-gray-400 line-through' : '']"
				@click="editing = true"
			>
				{{ item.content || 'Untitled' }}
			</span>
			<button
				class="text-gray-400 hover:text-gray-900 whitespace-nowrap items-center rounded p-0.5"
				@click.prevent="deleteItem"
			>
				<IconTrash size="16" />
			</button>
		</template>
	</div>
</template>
