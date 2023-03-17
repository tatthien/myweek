<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Label } from '@/types'

const props = defineProps<{
	item: Label
}>()

const color = ref(props.item.color)
watch(
	() => props.item.color,
	newVal => (color.value = newVal)
)

const h = computed(() => {
	return Number(color.value.split(',')[0])
})

const s = computed(() => {
	return Number(color.value.split(',')[1])
})

const l = computed(() => {
	return Number(color.value.split(',')[2])
})

const bgColor = computed(() => {
	return `hsla(${h.value},${s.value}%,${l.value}%, 1)`
})

const textColor = computed(() => {
	let light = l.value - 50
	return `hsla(${h.value},${s.value}%,${light}%, 1)`
})
</script>

<template>
	<div>
		<slot v-bind="{ background: bgColor, color: textColor, title: item.title }">
			<div :style="{ backgroundColor: bgColor, color: textColor }" class="rounded-md w-auto px-2 py-1 text-sm">
				{{ item.title }}
			</div>
		</slot>
	</div>
</template>
