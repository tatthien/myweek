<script lang="ts" setup>
import { format } from 'date-fns'
import { saturday, sunday, weekdays } from '@/composables/date'
import { useTasks } from '@/stores/task'
import TaskList from '@/components/TaskList.vue'
import AppHeader from '@/components/AppHeader.vue'

const store = useTasks()
store.fetchTasks()
</script>
<template>
  <div class="font-inter h-full">
    <AppHeader class="py-6 px-4" />
    <main class="snap-x flex-1 min-h-[calc(100%-80px)] overflow-x-auto">
      <div class="grid grid-cols-[repeat(6,minmax(300px,1fr))] pb-12">
        <TaskList
          v-for="(weekday, index) in weekdays"
          :key="index"
          :date="weekday"
          :list-id="format(weekday, 'ddMMyyyy')"
          :class="['snap-center', index === 0 ? 'ml-4 mr-1.5' : 'mx-1.5']"
        />
        <div class="todo-group ml-1.5 mr-4 snap-center">
          <TaskList
            :date="saturday"
            :list-id="format(saturday, 'ddMMyyyy')"
          />
          <TaskList
            :date="sunday"
            :list-id="format(sunday, 'ddMMyyyy')"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.todo-group {
	display: grid;
	grid-template-rows: minmax(auto, max-content) minmax(auto, max-content);
	grid-row-gap: 1rem;
}
</style>
