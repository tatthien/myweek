<script lang="ts" setup>
import { computed } from 'vue'
import { IconLoader } from '@tabler/icons-vue'
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
		return 'bg-gray-200 text-gray-700 cursor-not-allowed'
	}

	switch (props.variant) {
		case 'secondary':
			return 'bg-white text-gray-900 border border-gray-300 shadow'
		default:
			return 'bg-gray-900 text-white hover:bg-gray-800 focus:ring focus:ring-gray-300 focus:ring-3'
	}
})

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'sm':
			return 'h-[32px] text-sm'
		default:
			return 'h-[40px]'
	}
})

const loaderIconSize = computed(() => {
	switch (props.size) {
		case 'sm':
			return 16
		default:
			return 20
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
			'inline-flex items-center gap-2 justify-center font-medium rounded-md px-4 transition whitespace-nowrap',
		]"
		:disabled="isDisabled"
		@click="click"
	>
		<div v-if="loading" class="animate-spin">
			<IconLoader :size="loaderIconSize" stroke-width="3" />
		</div>
		<slot />
	</button>
</template>
