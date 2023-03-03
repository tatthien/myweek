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
	} else {
		store.setUser(session.user)
		router.push({ name: 'home' })
	}
})
</script>

<template>
  <router-view />
  <ToastList class="toast-list" />
</template>

<style>
body,
html,
#app {
	height: 100%;
}
</style>
