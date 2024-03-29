<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Task } from '@/types'
import ModalEditTask from '@/components/ModalEditTask.vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import LabelItem from '@/components/LabelItem.vue'
import FormSelectLabels from '@/components/FormSelectLabels.vue'
import { useTasks } from '@/stores/task'
import { supabase } from '@/composables/supabase'
import {
	IconCheckbox,
	IconAlignJustified,
	IconTrash,
	IconEdit,
	IconCircleCheck,
	IconCircleCheckFilled,
	IconDots,
	IconTag,
	IconChevronRight,
} from '@tabler/icons-vue'

const store = useTasks()

const props = defineProps<{
	item: Task
}>()
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
	newVal => {
		title.value = newVal.title
		selectedLabels.value = newVal.labels
	}
)

const commpletedChecklistItems = computed(() => props.item.checklists.filter(e => e.completed))
const completedText = computed(() => {
	return `${commpletedChecklistItems.value.length}/${props.item.checklists.length}`
})
const showSubInfo = computed(() => props.item.description || props.item.checklists.length)
const showSelectLabels = ref(false)

const selectedLabels = ref([...props.item.labels])

async function changeStatus(status: string) {
	await store.update(props.item.id, { status })
	store.fetchList()
}

async function archive() {
	await store.delete(props.item.id)
	store.fetchList()
}

async function onSelectLabels(labels) {
	await supabase.from('tasks_labels').delete().eq('task_id', props.item.id)
	await supabase.from('tasks_labels').upsert(
		labels.map(({ id }) => {
			return {
				task_id: props.item.id,
				label_id: id,
				user_id: props.item.user_id,
			}
		})
	)
	store.fetchList()
}

function onDropdownHide() {
	showSelectLabels.value = false
}
</script>
<template>
	<div
		class="relative group px-2 py-2 bg-white rounded-md border border-gray-200 shadow-sm cursor-pointer select-none hover:bg-gray-50"
		tabindex="0"
		@keypress.enter.prevent="openModal = true"
	>
		<div @click="openModal = true">
			<div v-if="item.labels.length" class="flex flex-wrap gap-1 mb-2">
				<LabelItem v-for="label in item.labels" :key="label.id" :item="label">
					<template #default="{ background, color, title }">
						<span class="block text-xs rounded px-1.5 py-0.5" :style="{ backgroundColor: background, color: color }">{{
							title
						}}</span>
					</template>
				</LabelItem>
			</div>
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
		</div>
		<div class="hidden lg:block absolute top-2 right-2">
			<Dropdown @hide="onDropdownHide">
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
				<DropdownItem class="relative menu-item">
					<div class="flex items-center gap-2" @click.stop="showSelectLabels = !showSelectLabels">
						<IconTag size="16" />
						<span class="flex-1">Labels</span>
						<IconChevronRight size="16" />
					</div>
					<div v-if="showSelectLabels" class="child-menu absolute top-0 left-full min-w-full" @click.stop="false">
						<FormSelectLabels v-model="selectedLabels" @select="onSelectLabels" />
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
		<Teleport to="body">
			<ModalEditTask :item="item" :open="openModal" @close="openModal = false" />
		</Teleport>
	</div>
</template>

<style></style>
