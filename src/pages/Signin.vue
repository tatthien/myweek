<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/composables/supabase'
import { addToast } from '@/composables/toast'

const form = ref({
	email: '',
	password: '',
})

const isSigningIn = ref(false)

async function onSubmit() {
	isSigningIn.value = true
	const { error } = await supabase.auth.signInWithPassword({
		email: form.value.email,
		password: form.value.password,
	})
	if (error) {
		addToast('error', error.message)
	}
	isSigningIn.value = false
}
</script>
<template>
	<div class="flex items-center justify-center h-full bg-gray-50">
		<div class="mx-4 w-[400px]">
			<div class="mb-6 flex flex-col items-center justify-center">
				<img src="/img/icon-192.png" alt="MyWeek Logo" class="w-12 mb-2" />
				<div class="text-lg text-gray-600">MyWeek</div>
			</div>
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<div class="mb-4">
					<h1 class="text-xl font-medium">Welcome back</h1>
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
					<div class="mb-4">
						<FormKit
							v-model="form.password"
							type="password"
							label="Password"
							placeholder="••••••••"
							validation="required|length:6"
						/>
					</div>
					<div>
						<WButton type="submit" full :loading="isSigningIn"> Sign in </WButton>
					</div>
				</FormKit>
				<div class="text-center mt-8 text-sm">
					<router-link to="/forgot-password" class="underline mr-4">Forgot password?</router-link>
					<router-link to="/sign-up" class="underline"> Sign up now </router-link>
				</div>
			</div>
		</div>
	</div>
</template>
