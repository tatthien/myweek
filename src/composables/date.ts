import { ref, computed } from 'vue'
import { startOfWeek, addDays, subDays } from 'date-fns'

export const monday = startOfWeek(new Date(), { weekStartsOn: 1 })
export const firstDateOfWeek = ref(monday)
export const weekdays = computed(() => Array.from(Array(5)).map((_, i) => addDays(firstDateOfWeek.value, i)))
export const saturday = computed(() => addDays(firstDateOfWeek.value, 5))
export const sunday = computed(() => addDays(firstDateOfWeek.value, 6))

export function goToNextWeek() {
	firstDateOfWeek.value = addDays(firstDateOfWeek.value, 7)
}

export function goToPrevWeek() {
	firstDateOfWeek.value = subDays(firstDateOfWeek.value, 7)
}

export function jumpToCurrentWeek() {
	firstDateOfWeek.value = monday
}
