import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { signIn } from '$lib/constants/routes.js';
import type { Task } from '$lib/types/sb';

export const load: LayoutServerLoad = async ({ locals: { getSession, getTasks } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, signIn);
	}
	const { data: tasks, error } = await getTasks(session.user.id, null);
	if (error) {
		console.error(404, 'no tasks found.', error);
	}
	const archivedTasks = tasks.filter((task: Task) => task.is_archived === true && !task.completed);
	return {
		tasks: tasks.filter((task: Task) => task.is_archived === false || task.is_archived === null),
		archivedTasks: archivedTasks
	};
};
