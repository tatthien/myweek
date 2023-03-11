<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import { PlayCircleIcon, CheckCircleIcon, CalendarIcon } from '@heroicons/vue/24/solid'
import { Task } from '@/types'
import { ref, watch } from 'vue'
import { useTasks } from '@/stores/task'
import { addToast } from '@/composables/toast'
import { format } from 'date-fns'

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
const form = ref({
	status: props.item.status,
	title: props.item.title,
	description: props.item.description,
	date: props.item.date,
})
const openModal = ref(false)
watch(
	() => props.open,
	() => {
		openModal.value = props.open
	}
)
watch(
	() => props.item,
	() => {
		form.value.status = props.item.status
		form.value.title = props.item.title
		form.value.description = props.item.description
		form.value.date = props.item.date
	}
)
const isSaving = ref(false)
async function onSubmit() {
	isSaving.value = true
	try {
		await store.update(props.item.id, form.value)
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
						v-focus
						class="outline-none resize-none w-full text-xl font-medium h-[28px]"
						placeholder="Type task name..."
						@keypress.enter.prevent="onSubmit"
					/>
				</div>
				<div>
					<div class="space-y-2">
						<div class="grid grid-cols-[100px_1fr] items-center">
							<label class="md:text-sm text-gray-600 inline-flex items-center gap-2"
								><PlayCircleIcon class="w-4 h-4" />Status</label
							>
							<div>
								<select
									v-model="form.status"
									class="md:text-sm w-auto border border-gray-300 rounded-md px-2 h-[32px] outline-none focus:border-gray-400 transition"
								>
									<option value="active">Active</option>
									<option value="done">Done</option>
								</select>
							</div>
						</div>
						<div class="grid grid-cols-[100px_1fr] items-center">
							<label class="md:text-sm text-gray-600 inline-flex items-center gap-2">
								<CalendarIcon class="w-4 h-4" />
								Date
							</label>
							<div>
								<input
									v-model="form.date"
									type="date"
									class="md:text-sm w-auto border border-gray-300 rounded-md px-2 h-[32px] outline-none focus:border-gray-400 transition"
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
				</div>
				<div class="flex items-center gap-2 mt-10">
					<WButton variant="secondary" size="sm" @click="emit('close')"> Cancel </WButton>
					<WButton type="submit" :loading="isSaving" size="sm"> Save </WButton>
				</div>
			</form>
		</div>
	</Modal>
</template>
