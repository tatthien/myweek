<script lang="ts" setup>
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import { supabase } from '@/composables/supabase'
import ToastList from '@/components/ToastList.vue'

const store = useUser()
const router = useRouter()

supabase.auth.onAuthStateChange((event, session) => {
	if (event === 'SIGNED_OUT') {
		store.setUser(null)
		router.push({ name: 'signin' })
	} else if (event === 'PASSWORD_RECOVERY') {
		router.push({ name: 'reset-password' })
	} else {
		store.setUser(session.user)
		router.push({ name: 'home' })
	}
})
</script>

<template>
	<router-view />
	<Teleport to="body">
		<ToastList class="toast-list" />
	</Teleport>
</template>

<style>
body,
html,
#app {
	height: 100%;
}
</style>
