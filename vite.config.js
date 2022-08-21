import { defineConfig } from 'vite';
import { resolve } from 'path';
import { resolvePackage, isDev } from './build/utils';
import { createPlugins } from './build/vite';

const TIMESTAMP = new Date().getTime();

const pathResolve = (dir) => {
	return resolve(process.cwd(), '.', dir);
};

export default (options) => {
	const ENV_IS_DEV = isDev(options.mode);

	return defineConfig({
		/**
		 * base: 同webpack {output.publicPath}, prod下可以是cdn
		 * publicDir: 同webpack copy文件夹内的静态资源
		 */
		base: ENV_IS_DEV ? '/' : '/',

		resolve: {
			alias: [
				{
					find: /@\//,
					replacement: pathResolve('src') + '/',
				},
				{
					find: /@assets/,
					replacement: pathResolve('src') + '/assets/',
				},
			],
		},

		plugins: createPlugins(options),

		/**
		 * https://cn.vitejs.dev/guide/features.html#css
		 */
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: resolvePackage('@wya/sass/lib/mixins/bem.scss', { read: true }),
				},
			},
		},

		build: {
			outDir: 'dist',
			assetsDir: `static.${TIMESTAMP}`,
		},

		define: {
			'process.env.BRANCH': process.env.BRANCH || '"develop"',
			__DEV__: ENV_IS_DEV,
		},
	});
};
