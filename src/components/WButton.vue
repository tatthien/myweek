<script lang="ts" setup>
import { computed } from 'vue'
type PropType = {
	variant?: 'primary' | 'secondary'
	size?: 'sm' | 'base' | 'lg'
	full?: boolean
	loading?: boolean
	disabled?: boolean
}
const props = withDefaults(defineProps<PropType>(), {
	variant: 'primary',
	size: 'base',
	full: false,
	loading: false,
	disabled: false,
})
const emit = defineEmits(['click'])

const colorClasses = computed(() => {
	if (props.disabled) {
		return 'bg-gray-300 text-gray-600 cursor-not-allowed'
	}

	switch (props.variant) {
		case 'secondary':
			return 'bg-white text-gray-900 border border-gray-300 shadow'
		default:
			return 'bg-blue-600 text-white hover:bg-blue-700'
	}
})

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'sm':
			return 'h-[32px]'
		default:
			return 'h-[40px]'
	}
})

const isDisabled = computed(() => props.loading || props.disabled)

function click() {
	emit('click')
}
</script>
<template>
	<button
		:class="[
			colorClasses,
			sizeClasses,
			full ? 'w-full' : 'w-auto',
			'inline-flex items-center justify-center font-medium rounded-md px-4 transition',
		]"
		:disabled="isDisabled"
		@click="click"
	>
		<slot v-if="!loading" />
		<div v-else class="flex items-center gap-1">
			<span class="w-2 h-2 rounded animate-pulse bg-white" />
			<span class="w-2 h-2 rounded animate-pulse bg-white" />
			<span class="w-2 h-2 rounded animate-pulse bg-white" />
		</div>
	</button>
</template>
