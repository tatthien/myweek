import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '@/stores/user'

const Home = () => import('./pages/Home.vue')
const Signin = () => import('./pages/Signin.vue')
const Signup = () => import('./pages/Signup.vue')

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		name: 'signin',
		path: '/sign-in',
		component: Signin,
		meta: {
			authPage: true,
		},
	},
	{
		name: 'signup',
		path: '/sign-up',
		component: Signup,
		meta: {
			authPage: true,
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const store = useUser()
	if (to.meta.requiresAuth && !store.isAuthenticated) {
		next({ name: 'signin' })
	} else if (to.meta.authPagee && store.isAuthenticated) {
		next({ name: 'home' })
	} else next()
})

export { router }
