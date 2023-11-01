import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import type { Task } from '$lib/types/sb';

export const load: LayoutServerLoad = async ({ locals: { getSession, getTasks } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const tasks: Task[] = await getTasks(session.user.id, null);
	return {
		tasks
	};
};
