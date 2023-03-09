<template>
	<div
		class="px-2 py-2 text-sm bg-white rounded-md border border-gray-150 cursor-pointer select-none hover:bg-gray-50"
		tabindex="0"
		@click="openModal = true"
		@keypress.enter.prevent="openModal = true"
	>
		<div v-if="!editing">
			<div class="flex items-center box-content">
				<CheckCircleIcon v-if="item.status === 'done'" class="w-4 h-4 mr-2 text-gray-400 shrink-0" />
				<span class="block break-all" :style="styles" :class="[item.status === 'done' ? 'text-gray-400' : '']">
					{{ title.trim() || 'Untitled' }}
				</span>
			</div>
			<div>
				<Bars3BottomLeftIcon v-if="item.description" class="w-4 h-4 text-gray-400" />
			</div>
		</div>
		<textarea
			v-else
			v-model="content"
			v-auto-resize
			v-focus
			class="block w-full resize-none outline-none h-[22px] bg-transparent"
			placeholder="Type task name..."
		/>
		<Teleport to="body">
			<ModalEditTask :item="item" :open="openModal" @close="openModal = false" />
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Task } from '@/types'
import ModalEditTask from '@/components/ModalEditTask.vue'
import { useTasks } from '@/stores/task'
import { useUser } from '@/stores/user'
import { CheckCircleIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/solid'

const store = useTasks()

const props = defineProps<{
	item: Task
}>()
const emit = defineEmits('submit')
const openModal = ref(false)
const styles = computed(() => {
	return {
		lineHeight: '22px',
		background: props.item.color,
	}
})
const editing = ref(props.item.editing)
const title = ref(props.item.title)

watch(
	() => props.item,
	() => (title.value = props.item.title)
)
</script>
