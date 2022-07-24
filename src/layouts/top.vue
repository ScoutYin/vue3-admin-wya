<template>
	<div :style="{ left: `${leftMenuWidth}px` }" class="v-layout-top">
		<div class="g-flex-ac g-jc-sb">
			<div v-if="topMenus.length === 1" class="_name">
				{{ topMenus[0].title }}
			</div>
			<div v-else class="g-flex-ac g-fw-w">
				<router-link
					v-for="menu in topMenus"
					:key="menu.path"
					:to="menu.path"
					:class="
						activeChain[2].path === menu.path
							? '_menu-item-active'
							: '_menu-item-unactive'
					"
					class="_menu-item"
				>
					{{ menu.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, onBeforeMount } from 'vue';
import { Global } from '@globals/index';
import { useMenus } from './hooks';

let leftMenuWidth = ref(0);

const { activeChain } = useMenus();

const topMenus = computed(() => {
	return activeChain.value[1]?.children || [activeChain.value[activeChain.value.length - 1]];
});

// methods
const setLeftDistance = ({ distance }) => {
	leftMenuWidth.value !== distance && (leftMenuWidth.value = distance);
};

// lifecycle
onBeforeMount(() => {
	Global.on('layout-left-menu', setLeftDistance);
});
onMounted(() => {
	// 让left-menu 再次告知它自己当前的宽度
	Global.emit('layout-top-menu', { distance: 55 });
	Global.emit('layout-left-menu-emit-again', { emit: true });
});
onBeforeUnmount(() => {
	Global.emit('layout-top-menu', { distance: 0 });
	Global.off('layout-left-menu', setLeftDistance);
});
</script>

<style lang="scss">
.v-layout-top {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 999;
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
