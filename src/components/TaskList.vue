<template>
  <div class="flex flex-col bg-gray-50 border border-gray-200 rounded" style="min-height: 210px">
    <header
      v-if="dateOfMonth"
      class="flex justify-between items-center px-2 py-1 border-b-1 border-gray-300 text-xl"
    >
      <span class="font-bold">{{ dateOfMonth }}.{{ month }}</span>
      <span class="text-gray-500">{{ dateOfWeek }}</span>
    </header>
    <div class="todo-body flex flex-col flex-1 px-2">
      <div class="mt-2 flex-none">
        <input
          v-model="taskName"
          type="text"
          class="px-2 w-full outline-none shadow rounded focus:shadow-lg"
          style="height: 42px"
          placeholder="Add task"
          @keydown.enter="createTask"
        />
      </div>
      <Draggable
        v-model="tasks"
        v-bind="dragOptions"
        class="flex-grow"
        item-key="id"
        ghost-class="ghost"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        :group="{ name: 'task', pull: true, put: true }"
        @start="onStartDragging"
        @end="onEndDragging"
      >
        <template #item="{ element }">
          <TaskItem
            :task="element"
            :key="element.id"
            class="my-2 bg-white shadow rounded"
            style="height: 42px"
          />
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref } from 'vue'
import { format } from 'date-fns'
import { Task, TaskStatus } from '../services/task/types'
import useTasks from '../services/task/state'
import TaskItem from './TaskItem.vue'
import Draggable from 'vuedraggable'

export default defineComponent({
  props: {
    date: {
      type: Date,
      default: null,
    },
    listId: {
      type: String,
      required: true,
    },
  },
  components: {
    TaskItem,
    Draggable,
  },
  setup(props) {
    const store = useTasks()
    const date = toRef(props, 'date')
    const listId = toRef(props, 'listId')

    const allTasks = store.allTasks
    const tasks = computed({
      get: () => {
        return allTasks
          .filter(task => task.listId === listId.value)
          .sort((a, b) => {
            return a.order - b.order
          })
      },
      set: tasks => {
        tasks.forEach((task, index) => {
          task.date = date.value
          task.listId = listId.value
          task.order = index
          store.update(task)
        })
      },
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
        order: 1000,
      }

      store.create(task)

      taskName.value = ''
    }

    const drag = ref(false)

    const onStartDragging = () => {
      drag.value = true
    }

    const onEndDragging = () => {
      drag.value = false
    }

    return {
      dateOfWeek: date.value ? computed(() => format(date.value, 'E')) : null,
      dateOfMonth: date.value ? computed(() => format(date.value, 'dd')) : null,
      month: date.value ? computed(() => format(date.value, 'MM')) : null,
      tasks,
      taskName,
      createTask,
      drag,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      onStartDragging,
      onEndDragging,
    }
  },
})
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  @apply border border-pink-400;
}
</style>
