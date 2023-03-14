<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/composables/supabase'
import { addToast } from '@/composables/toast'

const form = ref({
	email: '',
	password: '',
	firstName: '',
	lastName: '',
})

const isSigningUp = ref(false)

async function onSubmit() {
	isSigningUp.value = true
	const { error } = await supabase.auth.signUp({
		email: form.value.email,
		password: form.value.password,
		options: {
			data: {
				firstName: form.value.firstName,
				lastName: form.value.lastName,
			},
		},
	})
	if (error) {
		addToast('error', error.message)
	}
	isSigningUp.value = false
}
</script>
<template>
	<div class="flex items-center justify-center h-full bg-gray-50">
		<div class="mx-4 w-[400px] bg-white border border-gray-200 rounded-lg p-6">
			<div class="mb-4">
				<h1 class="text-xl font-medium">Get started</h1>
			</div>
			<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="onSubmit">
				<div class="flex gap-3">
					<FormKit v-model="form.firstName" type="text" label="First name" placeholder="John" validation="required" />
					<FormKit v-model="form.lastName" type="text" label="Last name" placeholder="Doe" validation="required" />
				</div>
				<FormKit
					v-model="form.email"
					type="email"
					label="Email"
					placeholder="you@example.com"
					validation="required|email"
				/>
				<FormKit
					v-model="form.password"
					type="password"
					label="Password"
					name="password"
					placeholder="••••••••"
					validation="required|length:6"
				/>
				<FormKit
					type="password"
					label="Confirm password"
					name="password_confirm"
					placeholder="••••••••"
					validation="required|confirm"
				/>
				<div>
					<WButton type="submit" full :loading="isSigningUp"> Sign up </WButton>
				</div>
			</FormKit>
			<div class="text-center text-sm mt-8">
				<span>Have an account? </span>
				<router-link to="/sign-in" class="underline"> Sign in now </router-link>
			</div>
		</div>
	</div>
</template>
