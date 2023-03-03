<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
	defineProps<{
		title?: string
		open?: boolean
	}>(),
	{
		title: '',
		open: false,
	}
)

const emit = defineEmits(['close'])

const open = ref(props.open)

function close() {
	open.value = false
	emit('close')
}
</script>

<template>
  <div class="fixed inset-0">
    <div class="bg-white absolute left-1/2 top-32 -translate-x-1/2 rounded-md shadow-lg z-10 w-[520px]">
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
    <div
      class="absolute inset-0 bg-black opacity-20 z-8"
      @click="close"
    />
  </div>
</template>
