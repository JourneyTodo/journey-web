import { formatDate, getNextDay } from '$lib/functions/utils';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { Task } from '$lib/types/sb';

export const load: PageServerLoad = async ({ parent, locals: { getTasksByDate } }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, signIn);
	}

	const nextDay = formatDate(getNextDay(new Date()));
	const { data: tasks, error } = await getTasksByDate(session.user.id, nextDay, 'gte');
	if (error) {
		console.error(404, 'no tasks found.', error);
	}
	const archivedTasks = tasks.filter((task: Task) => task.is_archived === true && !task.completed);
	return {
		tasks: tasks.filter((task: Task) => task.is_archived === false || task.is_archived === null),
		archivedTasks: archivedTasks
	};
};
