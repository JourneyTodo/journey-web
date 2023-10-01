import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { signIn, register } from '$lib/constants/routes';

/**
 *  To make the session available across the UI, including pages and layouts,
 * it's crucial to pass the session as a parameter in the root layout's server load function.
 */
export const load: LayoutServerLoad = async ({ locals: { getSession }, url }) => {
	const session = await getSession();

	if (!session && !url.pathname.includes(register) && url.pathname !== signIn) {
		throw redirect(302, signIn);
	}

	return {
		session: await getSession()
	};
};
