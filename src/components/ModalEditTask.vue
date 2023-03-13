<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import TaskChecklist from '@/components/TaskChecklist.vue'
import { IconCalendar, IconPlayerPlayFilled } from '@tabler/icons-vue'
import { Task } from '@/types'
import { ref, watch, computed } from 'vue'
import { useTasks } from '@/stores/task'
import { addToast } from '@/composables/toast'
import { format } from 'date-fns'
import isEqual from 'lodash/isEqual'

const props = withDefaults(
	defineProps<{
		item: Task
		open?: boolean
	}>(),
	{
		open: false,
	}
)
const emit = defineEmits(['close'])
const store = useTasks()
const form = ref({ ...props.item })
const openModal = ref(false)
const isSaving = ref(false)

watch(
	() => props.open,
	() => {
		openModal.value = props.open
	}
)
watch(
	() => props.item,
	() => {
		form.value = { ...props.item }
	}
)

const isFormChanged = computed(() => {
	return !isEqual(form.value, props.item)
})
const submitButtonText = computed(() => (isFormChanged.value ? 'Save all changes' : 'All changes saved'))

async function onSubmit() {
	isSaving.value = true
	try {
		await store.update(props.item.id, {
			status: form.value.status,
			date: form.value.date,
			description: form.value.description,
			title: form.value.title,
		})
		emit('close')
	} catch (error: any) {
		addToast('error', error.message)
	}
	isSaving.value = false
}
</script>
<template>
	<Modal v-if="openModal" title="Edit task" :open="openModal" @close="emit('close')" :header="false">
		<div class="p-6">
			<form @submit.prevent="onSubmit">
				<div class="mb-4">
					<textarea
						v-model.trim="form.title"
						v-auto-resize
						class="outline-none resize-none w-full text-xl font-medium h-[28px]"
						placeholder="Type task name..."
						@keypress.enter.prevent="onSubmit"
					/>
				</div>
				<div>
					<div class="space-y-2">
						<div class="grid grid-cols-[100px_1fr] items-center">
							<label class="md:text-sm text-gray-600 inline-flex items-center gap-2">
								<IconPlayerPlayFilled size="16" />
								Status
							</label>
							<div>
								<select
									v-model="form.status"
									class="md:text-sm w-auto rounded-md px-2 h-[32px] outline-none hover:bg-gray-100 transition cursor-pointer"
								>
									<option value="active">Active</option>
									<option value="done">Done</option>
								</select>
							</div>
						</div>
						<div class="grid grid-cols-[100px_1fr] items-center">
							<label class="md:text-sm text-gray-600 inline-flex items-center gap-2">
								<IconCalendar size="16" />
								Date
							</label>
							<div>
								<input
									v-model="form.date"
									type="date"
									class="md:text-sm w-auto rounded-md px-2 h-[32px] outline-none hover:bg-gray-100 transition"
								/>
							</div>
						</div>
					</div>
					<div class="mt-6">
						<textarea
							v-model.trim="form.description"
							v-auto-resize="80"
							class="md:text-sm px-2 py-2 overflow-y-hidden resize-none border border-transparent bg-gray-100 focus:bg-white focus:border-gray-400 transition rounded-md w-full outline-none"
							placeholder="Add a more detailed description..."
						/>
					</div>
					<div class="flex items-center gap-2 mt-4">
						<WButton type="submit" :loading="isSaving" size="sm" :disabled="!isFormChanged">{{
							submitButtonText
						}}</WButton>
					</div>
					<div class="mt-6">
						<h2 class="font-medium mb-4">Checklist</h2>
						<TaskChecklist :item="item" />
					</div>
				</div>
			</form>
		</div>
	</Modal>
</template>
