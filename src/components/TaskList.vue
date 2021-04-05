<template>
  <div class="flex flex-col" style="min-height: 210px">
    <header v-if="dateOfMonth" class="flex justify-between items-center border-b-2 border-black pb-1 text-xl">
      <span class="font-bold">{{ dateOfMonth }}.{{ month }}</span>
      <span class="text-gray-400">{{ dateOfWeek }}</span>
    </header>
    <div class="todo-body flex-1">
      <TaskItem
        :task="task"
        v-for="task in tasks"
        :key="task.id"
        class="border-b hover:border-gray-700"
        style="height: 42px"
      />
      <div class="border-b hover:border-gray-700">
        <input
          v-model="taskName"
          type="text"
          class="px-2 w-full outline-none focus:shadow-lg transform focus:scale-110"
          style="height: 42px"
          @keydown.enter="createTask"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref } from 'vue'
import { format } from 'date-fns'
import { Task, TaskStatus } from '../services/task/types'
import useTasks from '../services/task/state'
import TaskItem from './TaskItem.vue'

export default defineComponent({
  props: {
    date: {
      type: Date,
      default: null,
    },
    listId: {
      type: String,
      required: true,
    }
  },
  components: {
    TaskItem,
  },
  setup(props) {
    const store = useTasks()
    const date = toRef(props, 'date')
    const listId = toRef(props, 'listId')

    const allTasks = store.allTasks
    const tasks = computed(() => {
      return allTasks.filter(task => task.listId === listId.value)
    })

    const taskName = ref('')

    const createTask = () => {
      const task: Task = {
        id: Date.now().toString(),
        content: taskName.value,
        date: date.value,
        color: 'transparent',
        status: TaskStatus.Active,
        listId: listId.value,
      }

      store.create(task)

      taskName.value = ''
    }

    return {
      dateOfWeek: date.value ? computed(() => format(date.value, 'E')) : null,
      dateOfMonth: date.value ? computed(() => format(date.value, 'dd')) : null,
      month: date.value ? computed(() => format(date.value, 'MM')) : null,
      tasks,
      taskName,
      createTask,
    }
  },
})
</script>
