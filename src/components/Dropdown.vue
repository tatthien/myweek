<script lang="ts" setup>
import { ref, provide } from 'vue'
const props = defineProps<{
	text?: string
}>()
const emit = defineEmits(['show', 'hide'])

const open = ref(false)

function show() {
	open.value = true
	emit('show')
}

function hide() {
	open.value = false
	emit('hide')
}

// @TODO: make as constant
provide('dropdown_context', { show, hide })
</script>
<template>
	<div v-click-outside="hide" class="relative">
		<button class="inline-flex" :aria-expanded="open" type="button" @click="show">
			<slot name="button">
				{{ props.text }}
			</slot>
		</button>
		<ul
			v-if="open"
			role="menu"
			tabindex="-1"
			class="absolute mt-6 py-2 min-w-[140px] top-0 right-0 bg-white border border-gray-150 rounded-md shadow-lg z-[1000]"
		>
			<slot />
		</ul>
	</div>
</template>
