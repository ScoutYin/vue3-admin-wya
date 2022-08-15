<template>
	<div class="v-layout-top">
		<div class="g-flex-ac g-jc-sb">
			<div v-if="topMenus.length === 1" class="_name">
				{{ topMenus[0].meta.title }}
			</div>
			<div v-else class="g-flex-ac g-fw-w">
				<router-link
					v-for="menu in topMenus"
					:key="menu.path"
					:to="menu.path"
					:class="activeChain[2].path === menu.path ? '_menu-item-active' : '_menu-item-unactive'"
					class="_menu-item"
				>
					{{ menu.meta.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useMenus } from './hooks';

const { activeChain } = useMenus();

const topMenus = computed(() => {
	return activeChain.value[1]?.children || [activeChain.value[activeChain.value.length - 1]];
});
</script>

<style lang="scss">
.v-layout-top {
	height: 56px;
	padding: 0 15px;
	background-color: var(--white);
	border-bottom: 1px solid var(--cd9);

	._name {
		height: 56px;
		padding-left: 21px;
		font-size: 14px;
		line-height: 56px;
		color: var(--black);
	}

	._menu-item {
		height: 56px;
		margin-right: 48px;
		font-size: 14px;
		line-height: 56px;
		cursor: pointer;
	}

	._menu-item-unactive {
		color: var(--black);
		opacity: 0.8;

		&:hover {
			opacity: 1;
			transition: opacity 0.2s ease-in-out;
			will-change: opacity;
		}
	}

	._menu-item-active {
		color: var(--main);
		border-bottom: 2px solid var(--main);
		box-sizing: border-box;
	}
}
</style>
