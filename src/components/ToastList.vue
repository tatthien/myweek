<script lang="ts" setup>
import { useToastStore } from '@/stores/toast'
import ToastItem from '@/components/ToastItem.vue'

const store = useToastStore()
</script>

<template>
	<div
		aria-live="assertive"
		class="z-[120] pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
	>
		<div class="flex w-full flex-col items-center space-y-2 sm:items-end">
			<TransitionGroup
				enter-active-class="transform ease-out duration-300 transition"
				enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
				leave-active-class="transition ease-in duration-100"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ToastItem
					v-for="{ id, type, title, content } in store.toasts"
					:id="id"
					:key="`toast-${id}`"
					:type="type"
					:title="title"
					:content="content"
				/>
			</TransitionGroup>
		</div>
	</div>
</template>
