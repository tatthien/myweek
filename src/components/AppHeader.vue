<script lang="ts" setup>
import { format } from 'date-fns'
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { firstDateOfWeek, goToNextWeek, goToPrevWeek } from '../composables/date'

const currentMonth = computed(() => format(firstDateOfWeek.value, 'MMM Y'))
</script>
<template>
	<header class="mb-8 flex items-center gap-6">
		<h1 class="text-xl font-medium">{{ currentMonth }}</h1>
		<div class="flex items-center gap-2">
			<button class="flex rounded hover:bg-gray-200" @click="goToPrevWeek">
				<ChevronLeftIcon class="w-5 h-5 text-gray-400" />
			</button>
			<button class="flex rounded hover:bg-gray-200" @click="goToNextWeek">
				<ChevronRightIcon class="w-5 h-5 text-gray-400" />
			</button>
		</div>
	</header>
</template>
