import * as WYA_VC from '@wya/vc';
import * as WYA_VCC from '@wya/vcc';

export const getVcConfig = (options) => {
	const { Global, Network, Router } = options;
	return {
		Icon: {
			urls: ['//at.alicdn.com/t/c/font_3590527_hfrik3xwar5.js'],
		},
		Portal: {
			install(app) {
				app.config.globalProperties.$request = Network.request;
				app.config.globalProperties.$global = Global;

				app.use(WYA_VC);
				app.use(WYA_VCC);
				app.use(Router);
			},
		},
	};
};
