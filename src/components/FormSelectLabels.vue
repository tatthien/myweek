<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useLabel } from '@/stores/label'
import LabelItem from '@/components/LabelItem.vue'
import { IconX } from '@tabler/icons-vue'
import { Label } from '@/types/label'

const props = defineProps<{
	modelValue: Label[]
}>()
const emit = defineEmits(['update:modelValue', 'select'])

const labelStore = useLabel()
const selectedLabels = ref<Label[]>([...props.modelValue])
watch(
	() => props.modelValue,
	newVal => (selectedLabels.value = [...newVal]),
	{ deep: true }
)

function selectLabel(label) {
	if (selectedLabels.value.find(e => e.id === label.id)) return
	selectedLabels.value.push(label)
	emit('update:modelValue', selectedLabels.value)
	emit('select', selectedLabels.value)
}

function removeLabel(label) {
	selectedLabels.value = selectedLabels.value.filter(e => e.id !== label.id)
	emit('update:modelValue', selectedLabels.value)
	emit('select', selectedLabels.value)
}
</script>
<template>
	<div class="border border-gray-150 bg-white rounded-md w-[300px] overflow-hidden">
		<div class="bg-gray-100 px-2 py-2 flex flex-wrap gap-2 border-b border-gray-150">
			<template v-if="selectedLabels.length">
				<div v-for="label in selectedLabels" :key="label.id">
					<LabelItem :item="label">
						<template #default="{ background, color, title }">
							<div
								class="flex items-center rounded-md px-2 py-0.5 text-sm"
								:style="{ background: background, color: color }"
							>
								<span>{{ title }}</span>
								<button type="button" class="ml-2" @click="removeLabel(label)"><IconX size="16" /></button>
							</div>
						</template>
					</LabelItem>
				</div>
			</template>
			<span v-else class="text-sm text-gray-600">No labels selected</span>
		</div>
		<div class="p-2 bg-white max-h-[400px] overflow-y-auto">
			<div class="text-xs mb-2 text-gray-500 font-medium">Select a label</div>
			<div class="space-y-1">
				<div
					v-for="label in labelStore.labels"
					:key="label.id"
					class="cursor-pointer hover:opacity-80"
					tabindex="0"
					@click="selectLabel(label)"
				>
					<LabelItem :item="label" />
				</div>
			</div>
		</div>
	</div>
</template>
