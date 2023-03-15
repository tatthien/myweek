export default {
	beforeMount(el, binding) {
		el._triggerEvent = (event: Event) => {
			if (el === event.target || event.composedPath().includes(el)) {
				return
			}
			if (typeof binding.value === 'function') {
				binding.value()
			}
		}
		document.addEventListener('click', el._triggerEvent)
	},
	unmounted(el) {
		document.removeEventListener('click', el._triggerEvent)
	},
}
