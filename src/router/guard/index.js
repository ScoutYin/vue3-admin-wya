import { createPermissionGuard } from './permissionGuard';
import { createErrorHandler } from './errorHandler';

export const setupRouterGuard = (router) => {
	createPermissionGuard(router);
	createErrorHandler(router);
};
