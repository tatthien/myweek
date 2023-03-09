<script lang="ts" setup>
import { ref, provide } from 'vue'
const props = defineProps<{
	text?: string
}>()

const open = ref(false)

function show() {
	open.value = true
}

function hide() {
	open.value = false
}

// @TODO: make as constant
provide('dropdown_context', { show, hide })
</script>
<template>
	<div class="relative z-10" v-click-outside="hide">
		<button @click.stop="open = !open" class="inline-flex">
			<slot name="button">{{ props.text }}</slot>
		</button>
		<ul
			v-if="open"
			class="absolute mt-6 py-2 min-w-[140px] top-0 right-0 bg-white border border-gray-150 rounded-md shadow-lg"
		>
			<slot></slot>
		</ul>
	</div>
</template>
