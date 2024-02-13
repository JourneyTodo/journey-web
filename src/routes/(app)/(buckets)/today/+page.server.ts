import { formatDate } from '$lib/functions/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/constants/routes';
import type { Task } from '$lib/types/sb';

export const load: PageServerLoad = async ({ parent }) => {
	const { session, tasks } = await parent();
	if (!session) {
		throw redirect(302, signIn);
	}
	return {
		tasks: tasks.filter(
			(task: Task) => task.target_date === formatDate(new Date()) && !task.is_archived
		),
		archivedTasks: tasks.filter((task: Task) => task.is_archived === true && !task.completed)
	};
};
