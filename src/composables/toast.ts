import { useToastStore } from '@/stores/toast'

const store = useToastStore()

export function addToast(type: 'success' | 'error', title: string, content?: string): void {
	store.addItem({
		id: Date.now().toString(),
		type: type,
		title: title,
		content: content,
	})
}
