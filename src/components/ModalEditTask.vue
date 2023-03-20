<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import TaskChecklist from '@/components/TaskChecklist.vue'
import FormSelectLabels from '@/components/FormSelectLabels.vue'
import LabelItem from '@/components/LabelItem.vue'
import { IconCalendar, IconPlayerPlayFilled, IconTag } from '@tabler/icons-vue'
import { Task } from '@/types'
import { ref, watch, computed } from 'vue'
import { useTasks } from '@/stores/task'
import { useLabel } from '@/stores/label'
import { addToast } from '@/composables/toast'
import { format, parseISO } from 'date-fns'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import { DatePicker } from 'v-calendar'
import { supabase } from '@/composables/supabase'

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
const labelStore = useLabel()
const form = ref({ ...props.item })
const openModal = ref(false)
const isSaving = ref(false)
const selectedLabels = ref([])
const showSelectLabels = ref(false)

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
const dateText = computed(() => {
	let d = form.value.date
	if (typeof d === 'string') {
		d = parseISO(d)
	}
	return format(d, 'MMM dd, yyyy')
})
const showCalendar = ref(false)
const calendarAttrs = ref([
	{
		key: 'today',
		dot: true,
		dates: new Date(),
	},
])
async function onSubmit() {
	isSaving.value = true
	try {
		await store.update(props.item.id, {
			status: form.value.status,
			date: form.value.date,
			description: form.value.description,
			title: form.value.title,
		})
	} catch (error: any) {
		addToast('error', error.message)
	}
	isSaving.value = false
}

const debounceSubmit = debounce(() => {
	onSubmit()
}, 500)

function onSelectDay() {
	onSubmit()
	showCalendar.value = false
}

function onClose() {
	emit('close')
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
}
</script>
<template>
	<Modal v-if="openModal" title="Edit task" :open="openModal" :header="false" @close="onClose">
		<div class="p-6">
			<form @submit.prevent="onSubmit">
				<div class="mb-4">
					<textarea
						v-model.trim="form.title"
						v-auto-resize
						class="outline-none resize-none w-full text-xl font-medium h-[28px]"
						placeholder="Type task name..."
						@keypress.enter.prevent="onSubmit"
						@input="debounceSubmit"
					/>
				</div>
				<div>
					<div class="space-y-2">
						<div class="flex items-center">
							<label class="w-[100px] md:text-sm text-gray-600 inline-flex items-center gap-2">
								<IconPlayerPlayFilled size="16" />
								Status
							</label>
							<div>
								<select
									v-model="form.status"
									class="md:text-sm w-auto rounded-md px-2 h-[32px] outline-none hover:bg-gray-100 transition cursor-pointer focus:ring focus:ring-3 focus:ring-gray-300 focus:border focus:border-gray-400"
									@change="onSubmit"
								>
									<option value="active">Active</option>
									<option value="done">Done</option>
								</select>
							</div>
						</div>
						<div class="flex items-center">
							<label class="w-[100px] md:text-sm text-gray-600 inline-flex items-center gap-2">
								<IconCalendar size="16" />
								Date
							</label>
							<div v-click-outside="() => (showCalendar = false)" class="relative">
								<button
									type="button"
									class="outline-none text-sm hover:bg-gray-100 transition px-2 rounded-md h-[32px] border border-transparent focus:ring focus:ring-3 focus:ring-gray-300 focus:border-gray-400"
									@click="showCalendar = !showCalendar"
								>
									{{ dateText }}
								</button>
								<div
									v-if="showCalendar"
									class="absolute z-10 mt-1 right-1/2 translate-x-1/2 md:left-0 md:translate-x-0"
								>
									<DatePicker
										v-model="form.date"
										mode="date"
										is-required
										:first-day-of-week="2"
										:attributes="calendarAttrs"
										@dayclick="onSelectDay"
									/>
								</div>
							</div>
						</div>
						<div class="md:flex md:items-center">
							<label class="w-[100px] md:text-sm text-gray-600 inline-flex items-center gap-2 shrink-0">
								<IconTag size="16" />
								Labels
							</label>
							<div>
								<div v-click-outside="() => (showSelectLabels = false)" class="relative">
									<div
										:class="[
											showSelectLabels ? 'opacity-0' : '',
											'outline-none cursor-pointer flex flex-wrap gap-1 hover:bg-gray-100 rounded-md px-2 py-2 border border-transparent focus:ring focus:ring-3 focus:ring-gray-300 focus:border-gray-400',
										]"
										role="button"
										tabindex="0"
										@click="showSelectLabels = true"
									>
										<template v-if="form.labels.length">
											<LabelItem v-for="label in form.labels" :key="label.id" :item="label">
												<template #default="{ background, color, title }">
													<span class="rounded-md px-2 py-1 text-sm" :style="{ background: background, color: color }">
														{{ title }}
													</span>
												</template>
											</LabelItem>
										</template>
										<span v-else class="text-sm">Select labels</span>
									</div>
									<FormSelectLabels
										v-if="showSelectLabels"
										v-model="form.labels"
										class="absolute z-10 top-0"
										@select="onSelectLabels"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="mt-6">
						<textarea
							v-model.trim="form.description"
							v-auto-resize="80"
							class="md:text-sm px-2 py-2 overflow-y-hidden resize-none border border-transparent bg-gray-100 focus:bg-white focus:border-gray-400 transition rounded-md w-full outline-none border border-transparent focus:ring focus:ring-3 focus:ring-gray-300 focus:border-gray-400"
							placeholder="Add a more detailed description..."
							@input="debounceSubmit"
						/>
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
