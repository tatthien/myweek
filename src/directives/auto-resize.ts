export default {
	mounted(el: Element, binding: any) {
		const minHeight = binding.value || 0
		el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`

		el.addEventListener(
			'input',
			() => {
				el.style.height = 0
				el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`
			},
			false
		)
	},
	updated(el: Element, binding: any) {
		const minHeight = binding.value || 0
		if (el.value.trim() === '') {
			el.style.height = `${el.scrollHeight > minHeight ? el.scrollHeight : minHeight}px`
		}
	},
}
