<template>
	<div class="v-layout-side-menu g-flex">
		<div class="v-layout-side-menu__first-level">
			<div style="height: 56px" class="g-flex-cc g-m-t-10">
				<vc-popover
					trigger="click"
					placement="bottom-right"
					:arrow="false"
					portal-class-name="c-layout-popup-options"
				>
					<img :src="LOGO" class="_logo" />
					<template #content>
						<div class="_line g-pointer g-flex-cc" @click="handleEditPwd">修改密码</div>
						<div class="_line g-pointer g-flex-cc" @click="handleLogOut">退出登录</div>
					</template>
				</vc-popover>
			</div>
			<router-link
				v-for="chunk in visibleMenus"
				:key="chunk.path"
				:to="chunk.path"
				:class="
					activeChain[0].path === chunk.path ? '__chunk-item-active' : '__chunk-item-unactive'
				"
				class="__chunk-item"
			>
				<div class="_item-icon">
					<vc-icon :type="chunk.meta.icon" :inherit="chunk.inherit" class="g-m-r-5" />
					<span>{{ chunk.meta.title }}</span>
				</div>
			</router-link>
		</div>

		<div v-if="showChildMenus" class="_two-level">
			<div class="__name">
				{{ realOneLevelChunk.meta.title }}
			</div>
			<div style="padding: 12px">
				<router-link
					v-for="menu in visibleChildMenus"
					:key="menu.path"
					:to="menu.path"
					:class="activeChain[1].path === menu.path ? '__menu-item-active' : '__menu-item-unactive'"
					class="__menu-item g-relative"
				>
					{{ menu.meta.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Modal } from '@wya/vc';
import { Global, Network } from '@globals';
import LOGO from '@assets/image/logo.png';
import { useMenus } from './hooks';

const route = useRoute();

const { visibleMenus, activeChain, visibleChildMenus, realOneLevelChunk } = useMenus();

// 是否展示二级导航菜单
const showChildMenus = computed(() => {
	// 当前路由没有要求隐藏二级导航菜单，且存在有效的二级导航菜单
	return !route.meta.hiddenNavigations?.includes(2) && visibleChildMenus.value.length;
});

const emitLeftMenuWidth = () => {
	Global.emit('layout-left-menu', { distance: showChildMenus.value ? 250 : 120 });
};

// 二级导航展示状态变化时，派发宽度变化事件
watch(showChildMenus, emitLeftMenuWidth);

// methods
const handleLogOut = () => {
	Modal.info({
		title: '提示',
		content: '确定退出登录？',
		onOk: async () => {
			await Network.request({
				url: '_COMMON_LOGIN_OUT_POST',
			});
			Global.clearLoginAuth();
		},
	});
};
const handleEditPwd = async () => {};

// lifecycle
onMounted(() => {
	emitLeftMenuWidth();
	// 防止其他组件在其发射时还没渲染
	Global.on('layout-left-menu-emit-again', emitLeftMenuWidth);
});
onUnmounted(() => {
	Global.emit('layout-left-menu', { distance: 0 });
	Global.off('layout-left-menu-emit-again', emitLeftMenuWidth);
});
</script>

<style lang="scss">
.v-layout-side-menu {
	user-select: none;

	._logo {
		width: 40px;
		height: 40px;

		// border-radius: 50%;
		cursor: pointer;
	}

	.v-layout-side-menu__first-level {
		width: 120px;
		height: 100%;
		background-color: var(--c444);

		.__chunk-item {
			display: block;
			height: 42px;
			padding-left: 23px;
			font-size: 15px;
			line-height: 42px;
			cursor: pointer;

			._item-icon {
				display: flex;
				align-items: center;
			}
		}

		.__chunk-item-unactive {
			color: var(--cbd);

			&:hover {
				background-color: var(--c67);
				transition: background-color 0.2s linear;
			}
		}

		.__chunk-item-active {
			color: var(--black);
			background-color: var(--cf8);
		}
	}

	._two-level {
		width: 130px;
		background-color: #fff;

		.__name {
			height: 56px;
			font-size: 14px;
			line-height: 56px;
			color: var(--black);
			text-align: center;
			border-right: 1px solid var(--cd9);
			border-bottom: 1px solid var(--cd9);
		}

		.__menu-item {
			display: block;
			height: 32px;
			margin-bottom: 5px;
			font-size: 14px;
			line-height: 32px;
			text-align: center;
			cursor: pointer;
		}

		.__menu-item-unactive {
			color: #676767;

			&:hover {
				color: var(--main);
				transition: color 0.2s linear;
			}
		}

		.__menu-item-active {
			color: var(--black);
			background: var(--cef);
			border-radius: 4px;
		}

		.__notice-dot {
			position: absolute;
			top: 50%;
			right: -5px;
			height: 20px;
			min-width: 20px;
			padding: 0 6px;
			font-size: 12px;
			color: #fff;
			background-color: #f8222d;
			border-radius: 10px;
			transform: translateY(-50%);
			box-sizing: border-box;
		}
	}
}

.c-layout-popup-options {
	.vc-popover-core__container {
		padding-right: 0;
		padding-left: 0;
	}

	._line {
		height: 30px;
		padding: 0 24px;
		font-size: 14px;
		transition: all 0.2s ease-in-out;

		&:hover {
			background: var(--translucent-main);
		}
	}
}
</style>
