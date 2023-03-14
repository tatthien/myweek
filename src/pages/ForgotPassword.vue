<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/composables/supabase'
import { addToast } from '@/composables/toast'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
	email: '',
})
const loading = ref(false)

async function onSubmit() {
	loading.value = true
	const { error } = await supabase.auth.resetPasswordForEmail(form.value.email, {
		redirectTo: `${import.meta.env.VITE_BASE_URL}/reset-password`,
	})
	if (error) {
		addToast('error', error.message)
	} else {
		addToast('success', 'Password reset email sent successfully! Please check your email')
		router.push({ name: 'signin' })
	}
	loading.value = false
}
</script>
<template>
	<div class="flex items-center justify-center h-full bg-gray-50">
		<div class="mx-4 w-[400px] bg-white border border-gray-200 rounded-lg p-6">
			<div class="mb-4">
				<h1 class="text-xl font-medium">Reset your password</h1>
			</div>
			<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="onSubmit">
				<div class="mb-4">
					<FormKit
						v-model="form.email"
						type="email"
						label="Email"
						placeholder="you@example.com"
						validation="required|email"
					/>
				</div>
				<div>
					<WButton type="submit" full :loading="loading"> Send reset email </WButton>
				</div>
			</FormKit>
			<div class="text-center text-sm mt-8">
				<span>Have an account? </span>
				<router-link to="/sign-in" class="underline"> Sign in now </router-link>
			</div>
		</div>
	</div>
</template>
