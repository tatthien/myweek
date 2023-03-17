<script lang="ts" setup>
import { useLabel } from '@/stores/label'
import LabelItem from '@/components/LabelItem.vue'
import { IconPencil, IconTrash } from '@tabler/icons-vue'
import { addToast } from '@/composables/toast'
const labelStore = useLabel()
labelStore.fetch()

async function onEdit(label) {}

async function onDelete(label) {
	try {
		await labelStore.delete(label.id)
		await labelStore.fetch()
	} catch (error: any) {
		addToast('error', error.message)
	}
}
</script>
<template>
	<div>
		<div v-if="!labelStore.labels.length" class="text-sm text-gray-500">No labels</div>
		<div v-else class="space-y-2">
			<LabelItem v-for="item in labelStore.labels" :key="item.id" :item="item">
				<template #default="{ background, color, title }">
					<div class="flex items-center justify-between">
						<span :style="{ background, color }" class="rounded px-2 py-1 text-sm">{{ title }}</span>
						<div class="flex gap-1">
							<button
								@click="onEdit(item)"
								class="p-1 inline-flex rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition"
							>
								<IconPencil size="16" />
							</button>
							<button
								@click="onDelete(item)"
								class="p-1 inline-flex rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition"
							>
								<IconTrash size="16" />
							</button>
						</div>
					</div>
				</template>
			</LabelItem>
		</div>
	</div>
</template>
