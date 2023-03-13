<template>
	<div
		class="group px-2 py-2 bg-white rounded-md border border-gray-150 cursor-pointer select-none hover:bg-gray-50"
		tabindex="0"
		@click="openModal = true"
		@keypress.enter.prevent="openModal = true"
	>
		<div class="relative">
			<div class="flex gap-2 box-content">
				<IconCircleCheckFilled v-if="item.status === 'done'" size="16" class="text-gray-400 shrink-0 mt-[2.5px]" />
				<span class="block" :style="styles" :class="[item.status === 'done' ? 'text-gray-400' : '']">
					{{ title || 'Untitled' }}
				</span>
			</div>
			<div v-if="showSubInfo" class="flex items-center gap-2.5 mt-2 text-xs text-gray-400">
				<IconAlignJustified v-if="item.description" size="16" />
				<div v-if="item.checklists.length" class="flex items-center gap-1">
					<IconCheckbox size="16" />
					{{ completedText }}
				</div>
			</div>
			<div class="absolute top-0 right-1">
				<Dropdown>
					<template #button>
						<span
							class="hidden group-hover:block border border-gray-200 shadow rounded bg-white text-gray-400 hover:text-gray-900"
						>
							<IconDots size="16" />
						</span>
					</template>
					<DropdownItem @click="openModal = true">
						<div class="flex item-centers gap-2">
							<IconEdit size="16" />
							Edit
						</div>
					</DropdownItem>
					<DropdownItem @click="changeStatus(item.status === 'active' ? 'done' : 'active')">
						<div class="flex items-center gap-2">
							<IconCircleCheck size="16" />
							Mark as {{ item.status === 'active' ? 'done' : 'active' }}
						</div>
					</DropdownItem>
					<DropdownItem @click="archive">
						<div class="flex items-center gap-2">
							<IconTrash size="16" class="text-red-400" />
							Delete
						</div>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
		<Teleport to="body">
			<ModalEditTask :item="item" :open="openModal" @close="openModal = false" />
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Task } from '@/types'
import ModalEditTask from '@/components/ModalEditTask.vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { useTasks } from '@/stores/task'
import { useUser } from '@/stores/user'
import {
	IconCheckbox,
	IconAlignJustified,
	IconTrash,
	IconEdit,
	IconCircleCheck,
	IconCircleCheckFilled,
	IconDots,
} from '@tabler/icons-vue'

const store = useTasks()

const props = defineProps<{
	item: Task
}>()
const emit = defineEmits(['submit'])
const openModal = ref(false)
const styles = computed(() => {
	return {
		lineHeight: '22px',
		background: props.item.color,
	}
})
const title = ref(props.item.title)

watch(
	() => props.item,
	() => (title.value = props.item.title)
)

const commpletedChecklistItems = computed(() => props.item.checklists.filter(e => e.completed))
const completedText = computed(() => {
	return `${commpletedChecklistItems.value.length}/${props.item.checklists.length}`
})
const showSubInfo = computed(() => props.item.description || props.item.checklists.length)

function changeStatus(status: string) {
	store.update(props.item.id, { status })
}

async function archive() {
	await store.delete(props.item.id)
}
</script>
