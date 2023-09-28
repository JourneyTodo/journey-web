import type { LayoutServerLoad } from './$types';

/**
 *  To make the session available across the UI, including pages and layouts,
 * it's crucial to pass the session as a parameter in the root layout's server load function.
 */
export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
