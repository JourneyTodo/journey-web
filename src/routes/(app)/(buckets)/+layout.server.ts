import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { signIn } from '$lib/constants/routes.js';

export const load: LayoutServerLoad = async ({ locals: { getSession, getTasks } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, signIn);
	}
	const tasks = await getTasks(session.user.id, null);
	return {
		tasks
	};
};
