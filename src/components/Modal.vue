<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
	defineProps<{
		title?: string
		open?: boolean
		size?: 'sm' | 'md' | 'lg'
	}>(),
	{
		title: '',
		open: false,
		size: 'md',
	}
)

const emit = defineEmits(['close'])

const open = ref(props.open)

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'lg':
			return 'md:w-[720px]'
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
	<div class="fixed inset-0">
		<div :class="[sizeClasses, 'absolute left-1/2 top-32 -translate-x-1/2 z-10 w-full px-4']">
			<div class="bg-white shadow-lg rounded-md">
				<slot name="header">
					<div class="p-6">
						<h1 class="font-medium text-lg">
							{{ title }}
						</h1>
					</div>
				</slot>
				<div class="px-6 py-6">
					<slot />
				</div>
			</div>
		</div>
		<div class="absolute inset-0 bg-black opacity-20 z-8" @click="close" />
	</div>
</template>
