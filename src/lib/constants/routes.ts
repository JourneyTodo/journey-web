/**
 * Single source of truth for all routes in the application.
 */

/**
 * @typedef {Object} BaseRoutes
 * @property {string} home - The home route
 */
/**
 * @type {BaseRoutes}
 */
export const baseRoutes = {
	home: '/'
};
export const { home } = baseRoutes;

/**
 * @typedef {Object} ProfileRoutes
 * @property {string} profile - The profile route
 */
/**
 * @type {ProfileRoutes}
 */
export const profileRoutes = {
	profile: '/profile'
};
export const { profile } = profileRoutes;

/**
 * @typedef {Object} AccountRoutes
 * @property {string} signIn - The sign-in route
 * @property {string} register - The register route
 * @property {string} registerSuccess - The register success route
 * @description These routes are prefixed with /account
 */
/**
 * @type {AccountRoutes}
 */
export const accountRoutes = {
	signIn: '/signin',
	logout: '/logout',
	register: '/register',
	registerSuccess: '/register/success',
	authCallback: '/auth/callback'
};
export const { signIn, register, registerSuccess, logout, authCallback } = accountRoutes;
