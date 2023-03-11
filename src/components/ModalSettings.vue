<script lang="ts" setup>
import { ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'
import { UserIcon, TagIcon, SwatchIcon } from '@heroicons/vue/24/outline'
import SettingsMyAccount from '@/components/settings/SettingsMyAccount.vue'
import SettingsLabels from '@/components/settings/SettingsLabels.vue'

const props = withDefaults(
	defineProps<{
		open?: boolean
	}>(),
	{
		open: false,
	}
)

const emit = defineEmits(['close'])

const openModal = ref(props.open)
watch(
	() => props.open,
	() => {
		openModal.value = props.open
	}
)

const tabGroup = [
	{
		section: 'Account',
		tabs: [
			{
				icon: UserIcon,
				id: 'account',
				text: 'My account',
			},
		],
	},
	{
		section: 'Settings',
		tabs: [
			{
				icon: SwatchIcon,
				id: 'appearance',
				text: 'Appearance',
			},
			{
				icon: TagIcon,
				id: 'labels',
				text: 'Labels',
			},
		],
	},
]

const currentTab = ref('account')
</script>

<template>
	<Modal v-if="openModal" :open="openModal" size="lg" :header="false" @close="emit('close')">
		<div class="flex">
			<div class="bg-gray-100 p-4 rounded-l-lg space-y-6">
				<div v-for="{ section, tabs } in tabGroup" :key="section">
					<div class="text-xs font-medium text-gray-500 my-2">{{ section }}</div>
					<div class="space-y-1">
						<div
							v-for="{ icon, text, id } in tabs"
							@click="currentTab = id"
							:class="[
								currentTab === id ? 'bg-gray-200 font-medium' : '',
								'hover:bg-gray-200 rounded px-2 py-1 -mx-2 transition',
							]"
							role="button"
							tabindex="0"
							:key="id"
						>
							<div class="flex items-center text-sm text-gray-700">
								<component :is="icon" class="w-4 h-4 mr-2 stroke-2" />
								<div>{{ text }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="p-4 flex-1">
				<SettingsMyAccount v-if="currentTab === 'account'" />
				<SettingsLabels v-if="currentTab === 'label'" />
			</div>
		</div>
	</Modal>
</template>
