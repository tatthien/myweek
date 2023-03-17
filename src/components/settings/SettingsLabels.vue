<script lang="ts" setup>
import { ref } from 'vue'
import LabelList from '@/components/LabelList.vue'
import FormSelectColor from '@/components/FormSelectColor.vue'
import { addToast } from '@/composables/toast'
import { useLabel } from '@/stores/label'
import { useUser } from '@/stores/user'
import { reset } from '@formkit/vue'

const labelStore = useLabel()
const userStore = useUser()

const form = ref({
	title: '',
	color: '',
})
const loading = ref(false)
async function onSubmit() {
	loading.value = true
	try {
		await labelStore.create({
			title: form.value.title,
			color: form.value.color,
			user_id: userStore.id,
		})
		reset('form')
	} catch (error: any) {
		addToast('error', error.message)
	}
	loading.value = false
}
</script>
<template>
	<div class="mb-4 pb-2 border-gray-300 block">Manage your labels</div>
	<div class="md:flex md:gap-4">
		<div>
			<div class="p-2 border border-gray-150 bg-white rounded-md shadow-sm mb-4 md:mb-0 md:w-[250px]">
				<FormKit
					type="form"
					id="form"
					:actions="false"
					:incomplete-message="false"
					novalidate
					@submit="onSubmit"
					#default="{ state: { valid } }"
					:config="{ validationVisibility: 'submit' }"
				>
					<div class="mb-4">
						<FormKit v-model="form.title" type="text" label="Title" validation="required" />
					</div>
					<div class="mb-4">
						<label class="block mb-1 text-gray-600 text-sm">Select a color</label>
						<FormSelectColor v-model="form.color" />
					</div>
					<div>
						<WButton type="submit" :loading="loading" size="sm" :disabled="!valid"> Create </WButton>
					</div>
				</FormKit>
			</div>
		</div>
		<div class="flex-1">
			<LabelList />
		</div>
	</div>
</template>
