<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { supabase } from '@/composables/supabase'
import { addToast } from '@/composables/toast'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(async () => {
	const { data } = await supabase.auth.getSession()
	if (data.session === null) {
		router.push({ name: 'signin' })
	}
})

const form = ref({
	password: '',
})

const loading = ref(false)

async function onSubmit() {
	loading.value = true
	const { error } = await supabase.auth.updateUser({ password: form.value.password })
	if (error) {
		addToast('error', error.message)
	}
	loading.value = false
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
					<h1 class="text-xl font-medium">Get started</h1>
				</div>
				<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="onSubmit">
					<div class="flex gap-3 mb-4">
						<FormKit v-model="form.firstName" type="text" label="First name" placeholder="John" validation="required" />
						<FormKit v-model="form.lastName" type="text" label="Last name" placeholder="Doe" validation="required" />
					</div>
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
							name="password"
							placeholder="••••••••"
							validation="required|length:6"
						/>
					</div>
					<div class="mb-4">
						<FormKit
							type="password"
							label="Confirm password"
							name="password_confirm"
							placeholder="••••••••"
							validation="required|confirm"
						/>
					</div>
					<div>
						<WButton type="submit" full :loading="isSigningUp"> Sign up </WButton>
					</div>
				</FormKit>
				<div class="text-center text-sm mt-8">
					<span>Have an account? </span>
					<router-link to="/sign-in" class="underline"> Sign in now </router-link>
				</div>
			</div>
			<div class="mx-4 w-[400px] bg-white border border-gray-200 rounded-lg p-6">
				<div class="mb-4">
					<h1 class="text-xl font-medium">Choose your new password</h1>
				</div>
				<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="onSubmit">
					<div class="mb-4">
						<FormKit
							v-model="form.password"
							type="password"
							label="Password"
							name="password"
							placeholder="••••••••"
							validation="required|length:6"
						/>
					</div>
					<div class="mb-4">
						<FormKit
							type="password"
							label="Confirm password"
							name="password_confirm"
							placeholder="••••••••"
							validation="required|confirm"
						/>
					</div>
					<div>
						<WButton type="submit" full :loading="loading"> Update </WButton>
					</div>
				</FormKit>
				<div class="text-center text-sm mt-8">
					<span>Have an account? </span>
					<router-link to="/sign-in" class="underline"> Sign in now </router-link>
				</div>
			</div>
		</div>
	</div>
</template>
