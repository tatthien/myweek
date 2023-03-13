<template>
	<div
		class="relative pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
	>
		<div class="p-4">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<IconCircleCheck v-if="type === 'success'" size="24" class="text-green-400" aria-hidden="true" />
					<IconCircleX v-else size="24" class="text-red-400" aria-hidden="true" />
				</div>
				<div class="ml-3 w-0 flex-1 pt-0.5">
					<p class="text-sm font-medium text-gray-900">
						{{ title }}
					</p>
					<p v-if="content" class="mt-1 text-sm text-gray-500">
						{{ content }}
					</p>
				</div>
				<div class="ml-4 flex flex-shrink-0">
					<button
						type="button"
						class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						@click="store.removeItem(props.id)"
					>
						<span class="sr-only">Close</span>
						<IconX size="16" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { IconCircleCheck, IconCircleX, IconX } from '@tabler/icons-vue'
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
	id: string | number
	title: string
	content?: string
	type: 'success' | 'error'
}>()
const store = useToastStore()

setTimeout(() => {
	store.removeItem(props.id)
}, 5000)
</script>
