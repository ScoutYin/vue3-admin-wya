<template>
	<div class="c-layout g-flex">
		<RouterView name="sideMenu" />
		<div class="g-flex g-fd-c g-col">
			<RouterView name="topMenu" />
			<RouterView name="breadcrumb" />
			<div :class="!$route.meta.noWrapStyle ? 'is-wrap' : ''" class="c-layout__content g-col">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script setup>
import { VcInstance } from '@wya/vc';
import { Service } from '@wya/vcc';
import { onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteUpdate(() => {
	VcInstance.clear();
	Service.clear();
});
</script>

<style lang="scss">
.c-layout {
	height: 100vh;
	overflow: hidden;

	&__content {
		&.is-wrap {
			padding: 20px;
			margin: 10px;
			background: #fff;
		}
	}
}
</style>
