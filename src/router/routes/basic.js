// import { resolveRoutesByGlob, normalizeRoutes } from '@/router/utils';
import Layout from '@/layouts/index.vue';
import { Exception } from '@/components/exception';
import { PAGE_NOT_FOUND_NAME } from '../constants';

const basicModules = ['login'];

export const basicModuleGlobs = basicModules.map((modName) => `../../modules/${modName}/index.js`);

const rootRoute = {
	path: '/',
	name: 'root',
	meta: {
		title: 'root',
	},
	// component: Layout,
	redirect: '/dashboard', // TODO
};

const loginRoute = {
	path: '/login',
	name: 'login',
	meta: {
		title: '登录',
	},
	component: () => import('@/modules/login/main/index.vue'),
};

const pageNotFoundRoute = {
	path: '/:path(.*)*',
	name: PAGE_NOT_FOUND_NAME,
	meta: {
		title: 'Not found',
	},
	// component: Exception,
	component: Layout,
	children: [
		{
			path: '/:path(.*)*',
			name: PAGE_NOT_FOUND_NAME,
			component: Exception,
			meta: {
				title: 'Not found',
				// hideBreadcrumb: true,
				// hideMenu: true,
			},
		},
	],
};
// 不需要权限就可以访问的路由
export const basicRoutes = [
	rootRoute,
	loginRoute,
	// ...normalizeRoutes(resolveRoutesByGlob(basicModuleGlobs)),
	pageNotFoundRoute,
];
