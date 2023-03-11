<script lang="ts" setup>
import { inject } from 'vue'

const emit = defineEmits(['click'])
const dropdownCtx = inject('dropdown_context')
function onClick() {
	emit('click')
	dropdownCtx.hide()
}
</script>
<template>
	<li role="presentation" class="block">
		<a
			role="menuitem"
			href="#"
			target="_self"
			class="block text-sm mx-2 px-2 py-1.5 bg-transparent text-gray-500 whitespace-nowrap rounded hover:bg-gray-100 hover:text-gray-900"
			@click="onClick"
		>
			<slot></slot>
		</a>
	</li>
</template>
