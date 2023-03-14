<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
	defineProps<{
		title?: string
		open?: boolean
		size?: 'sm' | 'md' | 'lg'
		header?: boolean
	}>(),
	{
		title: '',
		open: false,
		size: 'md',
		header: true,
	}
)

const emit = defineEmits(['close'])

const open = ref(props.open)

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'lg':
			return 'lg:w-[820px]'
		case 'md':
			return 'md:w-[620px]'
		default:
			return 'md:w-[520px]'
	}
})

function close() {
	open.value = false
	emit('close')
}
</script>

<template>
	<div
		style="--tw-bg-opacity: 0.3"
		class="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto bg-gray-900"
		role="dialog"
		tabindex="-1"
	>
		<div :class="[sizeClasses, 'absolute left-1/2 top-[2rem] md:top-[5rem] -translate-x-1/2 z-10 w-full px-4 pb-8']">
			<div class="bg-white shadow-lg rounded-md h-full">
				<template v-if="header">
					<slot name="header">
						<div class="p-6">
							<h1 class="font-medium text-lg">
								{{ title }}
							</h1>
						</div>
					</slot>
				</template>
				<slot />
			</div>
		</div>
		<div class="absolute inset-0" @click="close" />
	</div>
</template>
