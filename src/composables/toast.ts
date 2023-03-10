import { useToastStore } from '@/stores/toast'

export function addToast(type: 'success' | 'error', title: string, content?: string): void {
	const store = useToastStore()
	store.addItem({
		id: Date.now().toString(),
		type: type,
		title: title,
		content: content,
	})
}
