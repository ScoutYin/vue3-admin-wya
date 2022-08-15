<template>
	<div class="c-layout g-flex">
		<RouterView name="sideMenu" />
		<div class="g-flex">
			<RouterView name="topMenu" />
			<RouterView name="breadcrumb" />
			<div class="g-col">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script setup>
import { VcInstance } from '@wya/vc';
import { Service } from '@wya/vcc';
import { onBeforeRouteUpdate } from 'vue-router';

// import SideMenu from './side-menu.vue';
// import TopMenu from './top-menu.vue';

onBeforeRouteUpdate(() => {
	VcInstance.clear();
	Service.clear();
});
</script>

<style lang="scss">
.c-layout {
	overflow: hidden;
}
</style>
