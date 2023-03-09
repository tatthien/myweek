<template>
	<div
		class="group px-2 py-2 bg-white rounded-md border border-gray-150 cursor-pointer select-none hover:bg-gray-50"
		tabindex="0"
		@click="openModal = true"
		@keypress.enter.prevent="openModal = true"
	>
		<div class="relative">
			<div class="flex items-center box-content">
				<CheckCircleIcon v-if="item.status === 'done'" class="w-4 h-4 mr-2 text-gray-400 shrink-0" />
				<span class="block" :style="styles" :class="[item.status === 'done' ? 'text-gray-400' : '']">
					{{ title.trim() || 'Untitled' }}
				</span>
			</div>
			<div>
				<Bars3BottomLeftIcon v-if="item.description" class="w-4 h-4 text-gray-400" />
			</div>
			<div class="absolute top-0 right-1">
				<Dropdown>
					<template #button>
						<span
							class="hidden group-hover:block border border-gray-200 shadow rounded bg-white text-gray-400 hover:text-gray-900"
						>
							<EllipsisHorizontalIcon class="w-5 h-5 text-gray-400" />
						</span>
					</template>
					<DropdownItem @click="changeStatus(item.status === 'active' ? 'done' : 'active')">
						<div class="flex items-center">
							<CheckCircleOutlineIcon class="w-4 h-4 mr-2" />
							Mark as {{ item.status === 'active' ? 'done' : 'active' }}
						</div>
					</DropdownItem>
					<DropdownItem @click="archive">
						<div class="flex items-center">
							<TrashIcon class="w-4 h-4 text-red-400 mr-2" />
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
import { CheckCircleIcon, Bars3BottomLeftIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'
import { PencilSquareIcon, TrashIcon, CheckCircleIcon as CheckCircleOutlineIcon } from '@heroicons/vue/24/outline'

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
const title = ref(props.item.title)

watch(
	() => props.item,
	() => (title.value = props.item.title)
)

function changeStatus(status: string) {
	store.update(props.item.id, { status })
}

async function archive() {
	await store.delete(props.item.id)
}
</script>
