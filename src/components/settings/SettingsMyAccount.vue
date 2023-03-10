<script lang="ts" setup>
import { ref } from 'vue'
import { useUser } from '@/stores/user'
import { addToast } from '@/composables/toast'

const user = useUser()

const profile = ref({
	firstName: user.firstName,
	lastName: user.lastName,
})
const password = ref('')

const isUpdatingProfile = ref(false)
const isUpdatingPassword = ref(false)

async function updateProfile() {
	isUpdatingProfile.value = true
	try {
		await user.updateMeta(profile.value)
		addToast('success', 'Profile updated')
	} catch (error: any) {
		addToast('error', error.message)
	}
	isUpdatingProfile.value = false
}

async function updatePassword() {
	isUpdatingPassword.value = true
	try {
		await user.update({ password: password.value })
		addToast('success', 'Password updated')
	} catch (error: any) {
		addToast('error', error.message)
	}
	isUpdatingPassword.value = false
}
</script>
<template>
	<div class="mb-8">
		<div class="font-medium text-sm mb-4">Profile</div>
		<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="updateProfile">
			<div class="flex items-center gap-3">
				<div class="flex-1">
					<FormKit v-model.trim="profile.firstName" type="text" label="First name" placeholder="First name" />
				</div>
				<div class="flex-1">
					<FormKit v-model.trim="profile.lastName" type="text" label="Last name" placeholder="Last name" />
				</div>
			</div>
			<div>
				<WButton type="submit" size="sm" :loading="isUpdatingProfile">Save</WButton>
			</div>
		</FormKit>
	</div>
	<div class="mb-8">
		<div class="font-medium text-sm mb-4">Password</div>
		<FormKit type="form" :actions="false" :incomplete-message="false" novalidate @submit="updatePassword">
			<FormKit
				v-model.trim="password"
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
				<WButton type="submit" size="sm" :loading="isUpdatingPassword">Update password</WButton>
			</div>
		</FormKit>
	</div>
</template>
