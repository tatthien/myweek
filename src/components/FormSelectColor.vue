<script lang="ts" setup>
import { ref } from 'vue'
const colors = ['111,40,78', '120,25,65', '208,97,87', '210,50,60', '240,100,86', '53,85,87', '53,83,77', '43,100,52']
const props = defineProps<{
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
function hsl(color: string) {
	const c = color.split(',')
	return `hsl(${c[0]}, ${c[1]}%, ${c[2]}%)`
}
function onSelect(color) {
	value.value = color
	emit('update:modelValue', color)
}
</script>

<template>
	<div class="grid grid-cols-5 gap-2">
		<div v-for="(color, index) in colors" :key="index">
			<div
				role="button"
				:style="{ background: `${hsl(color)}` }"
				:class="['h-8 rounded', color === value ? 'ring ring-2 ring-offset-2 ring-gray-300 transition' : '']"
				@click="onSelect(color)"
			></div>
		</div>
	</div>
</template>
