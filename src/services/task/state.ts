import { Task } from './types'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'bullet_journal'

interface TaskState {
  tasks: Task[],
}

export const useTasks = defineStore({
  id: 'tasks',
  state(): TaskState {
    return {
      tasks: [],
    }
  },
  getters: {
    allTasks() {
      return this.tasks
    },
    tasksByListId(listId: string) {
      return this.tasks.filter(task => task.listId === listId)
    },
  },
  actions: {
    fetchTasks() {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      this.setTasks(tasks)
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks
    },
    create(task: Task) {
      this.tasks.push(task)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
    },
    update(updatedTask: Task) {
      this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
    }
  },
})

export default useTasks
