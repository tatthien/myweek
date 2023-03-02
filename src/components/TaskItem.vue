<template>
  <div>
    <div class="flex justify-between box-content">
      <span class="block" :style="styles">
        {{ task.content }}
      </span>
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
      }),
    }
  },
})
</script>
