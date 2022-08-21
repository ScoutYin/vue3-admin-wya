import './assets/style/index.scss';
import '@wya/vc/lib/vc.min.css';

import { createApp } from 'vue';
import * as WYA_VC from '@wya/vc';
import * as WYA_VCC from '@wya/vcc';
import { Global, Network, getVcConfig, getVccConfig } from '@/config';
import { router, setupRouter } from './router';

import App from './app.vue';

const app = createApp(App);
const options = {
	Global,
	Network,
	Router: router,
};

// 全局信息
app.use(Global, options);
setupRouter(app);

// VC配置
app.use(WYA_VC, getVcConfig(options));
app.use(WYA_VCC, getVccConfig(options));

app.mount('#app');

window.app = app;
