<template>
  <div>
    <div class="flex justify-between box-content" style="height: 22px; padding-top: 10px; padding-bottom: 10px;">
      <span 
        class="truncate block rounded-full px-2" 
        :style="styles"
      >
        {{ task.content }}
      </span>
      <button class="cursor-pointer focus:outline-none ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="172 104 113.333 160 84 132" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle></svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue'
import { Task } from '../services/task/types'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup(props) {
    const task = toRef(props, 'task')
    
    return {
      task,
      styles: computed(() => {
        return {
          lineHeight: '22px',
          background: task.value.color,
        }
      })
    }
  },
})
</script>
