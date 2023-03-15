<script lang="ts" setup>
import { ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'
import { IconUser, IconColorSwatch, IconTag } from '@tabler/icons-vue'
import SettingsMyAccount from '@/components/settings/SettingsMyAccount.vue'
import SettingsLabels from '@/components/settings/SettingsLabels.vue'
import SettingsAppearance from '@/components/settings/SettingsAppearance.vue'

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
				icon: IconUser,
				id: 'account',
				text: 'My account',
			},
		],
	},
	{
		section: 'Settings',
		tabs: [
			/* { */
			/* 	icon: IconColorSwatch, */
			/* 	id: 'appearance', */
			/* 	text: 'Appearance', */
			/* }, */
			{
				icon: IconTag,
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
			<div class="bg-gray-100 p-4 rounded-l-lg space-y-6 md:min-w-[180px]">
				<div v-for="{ section, tabs } in tabGroup" :key="section">
					<div class="hidden md:block text-xs font-medium text-gray-500 my-2">
						{{ section }}
					</div>
					<div class="space-y-1">
						<div
							v-for="{ icon, text, id } in tabs"
							:key="id"
							:class="[
								currentTab === id ? 'bg-gray-200 font-medium' : '',
								'hover:bg-gray-200 rounded px-2 py-1 -mx-2 transition',
							]"
							role="button"
							tabindex="0"
							@click="currentTab = id"
						>
							<div class="flex items-center gap-2 text-sm text-gray-700">
								<component :is="icon" size="16" />
								<div class="hidden md:block">
									{{ text }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="p-4 flex-1">
				<SettingsMyAccount v-if="currentTab === 'account'" />
				<SettingsLabels v-if="currentTab === 'labels'" />
			</div>
		</div>
	</Modal>
</template>
