import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { signIn } from '$lib/constants/routes.js';
import type { Task } from '$lib/types/sb';

export const load: LayoutServerLoad = async ({ locals: { getSession, getTasks } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, signIn);
	}
	const tasks = await getTasks(session.user.id, null);
	if (!tasks) {
		throw error(404, 'no tasks found.');
	}
	const archivedTasks = tasks.filter((task: Task) => task.is_archived === true);
	return {
		tasks: tasks.filter((task: Task) => task.is_archived === false || task.is_archived === null),
		archivedTasks: archivedTasks
	};
};
