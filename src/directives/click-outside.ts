const stopPropation = (e: Event): void => {
	e.stopPropagation()
}

let triggerEvent: () => void

export default {
	mounted(el: Element, binding: any) {
		if (typeof binding.value !== 'function') {
			throw Error(`[v-click-outside] ${binding.value} is not a function`)
		}

		triggerEvent = () => {
			binding.value()
		}

		el.addEventListener('click', stopPropation)
		document.addEventListener('click', triggerEvent)
	},
	unmounted(el: Element) {
		el.removeEventListener('click', stopPropation)
		document.addEventListener('click', triggerEvent)
	},
}
