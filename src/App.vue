<template>
  <div class="font-inter px-4 py-8 min-h-screen">
    <header class="mb-12 flex justify-between items-center">
      <h1 class="text-3xl font-bold">{{ currentMonth }}</h1>
      <div class="space-x-1">
        <button class="rounded hover:bg-gray-200" @click="prevWeek">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <circle
              cx="128"
              cy="128"
              r="96"
              fill="none"
              stroke="#000000"
              stroke-miterlimit="10"
              stroke-width="16"
            ></circle>
            <polyline
              points="144 92 104 128 144 164"
              fill="none"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            ></polyline>
          </svg>
        </button>
        <button class="rounded hover:bg-gray-200" @click="nextWeek">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <circle
              cx="128"
              cy="128"
              r="96"
              fill="none"
              stroke="#000000"
              stroke-miterlimit="10"
              stroke-width="16"
            ></circle>
            <polyline
              points="116 92 156 128 116 164"
              fill="none"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            ></polyline>
          </svg>
        </button>
      </div>
    </header>

    <main>
      <div class="lg:grid grid-cols-6 gap-4 mb-8" style="min-height: 480px">
        <TaskList
          v-for="(weekday, index) in weekdays"
          :key="index"
          :date="weekday"
          :listId="format(weekday, 'ddMMyyyy')"
          class="mb-4 lg:mb-0"
        />

        <div class="todo-group">
          <TaskList :date="saturday" :listId="format(saturday, 'ddMMyyyy')"/>
          <TaskList :date="sunday" :listId="format(sunday, 'ddMMyyyy')"/>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-2 text-xl">
          <span class="font-bold">Someday</span>
        </div>
        <div class="lg:grid grid-cols-3 gap-4">
          <TaskList listId="someday-1"/>
          <TaskList listId="someday-2"/>
          <TaskList listId="someday-3"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { addDays, subDays, startOfWeek, format } from 'date-fns'
import useTasks from './services/task/state'
import TaskList from './components/TaskList.vue'
export default defineComponent({
  name: 'App',
  components: {
    TaskList,
  },
  setup() {
    const store = useTasks()
    store.fetchTasks()

    const firstDOW = ref(startOfWeek(new Date(), { weekStartsOn: 1 }))

    const nextWeek = () => {
      firstDOW.value = addDays(firstDOW.value, 7)
    }

    const prevWeek = () => {
      firstDOW.value = subDays(firstDOW.value, 7)
    }

    return {
      weekdays: computed(() => Array.from(Array(5)).map((e, i) => addDays(firstDOW.value, i))),
      saturday: computed(() => addDays(firstDOW.value, 5)),
      sunday: computed(() => addDays(firstDOW.value, 6)),
      currentMonth: computed(() => format(firstDOW.value, 'MMMM Y')),
      nextWeek,
      prevWeek,
      format,
    }
  },
})
</script>

<style>
.todo-group {
  display: grid;
  grid-template-rows: minmax(210px, max-content) minmax(210px, auto);
  grid-row-gap: 1rem;
}
</style>
