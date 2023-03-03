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
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: form.value.email,
			password: form.value.password,
		})
		if (error) throw error
	} catch (error: any) {
		addToast('error', error.message)
	}
	isSigningIn.value = false
}
</script>
<template>
  <div class="flex items-center justify-center h-full bg-gray-50 text-sm">
    <div class="w-[400px] bg-white border border-gray-200 rounded-lg p-6">
      <div class="mb-4">
        <h1 class="text-xl font-medium">
          Welcome back
        </h1>
      </div>
      <FormKit
        type="form"
        :actions="false"
        :incomplete-message="false"
        novalidate
        @submit="onSubmit"
      >
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
          placeholder="••••••••"
          validation="required|length:6"
        />
        <div>
          <WButton
            type="submit"
            full
            :loading="isSigningIn"
          >
            Sign in
          </WButton>
        </div>
      </FormKit>
      <div class="text-center mt-8">
        <span>Don't have an account? </span>
        <router-link
          to="/sign-up"
          class="underline"
        >
          Sign up now
        </router-link>
      </div>
    </div>
  </div>
</template>
