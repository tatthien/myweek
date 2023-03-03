export default {
	mounted(el: Element, binding: any) {
		const minHeight = binding.value || 0
		el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`

		el.addEventListener('input', () => {
			el.style.height = minHeight
			el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`
		})
	},
	updated(el: Element, binding: any) {
		if (el.value.trim() === '') {
			const minHeight = binding.value || 0
			el.style.height = minHeight
			el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`
		}
	},
}
