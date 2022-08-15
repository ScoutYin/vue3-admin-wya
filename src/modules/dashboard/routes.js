import Layout from '@/layouts/index.vue';

export const routes = {
	path: '/dashboard',
	name: 'dashboard',
	redirect: '',
	component: Layout,
	children: [
		{
			path: 'workbench',
			name: 'dashboardWorkbench',
			components: {
				default: () => import('./workbench/index.vue'),
				sideMenu: true,
				topMenu: true,
			},
		},
	],
};
