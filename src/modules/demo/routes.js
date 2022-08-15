import Layout from '@/layouts/index.vue';

export const routes = {
	path: '/demo',
	name: 'demo',
	component: Layout,
	children: [
		{
			path: 'paging',
			name: 'demoPaging',
			children: [
				{
					path: 'basic',
					name: 'demoPagingBasic',
					components: {
						default: () => import('./paging-basic/index.vue'),
						sideMenu: true,
						topMenu: true,
					},
				},
				{
					path: 'tabs',
					name: 'demoPagingTabs',
					components: {
						default: () => import('./paging-tabs/index.vue'),
						sideMenu: true,
						topMenu: true,
					},
				},
			],
		},
		{
			path: 'form',
			name: 'demoForm',
			children: [
				{
					path: 'basic',
					name: 'demoFormBasic',
					components: {
						default: () => import('./form-basic/index.vue'),
						sideMenu: true,
						topMenu: true,
					},
				},
				{
					path: 'step',
					name: 'demoFormStep',
					components: {
						default: () => import('./form-step/index.vue'),
						sideMenu: true,
						topMenu: true,
					},
				},
			],
		},
	],
};
