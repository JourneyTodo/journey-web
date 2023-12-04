import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, params, locals: { getTasks } }) => {
	const { goals, user } = await parent();

	const goal = goals.find((goal) => {
		return goal.user_goal_id.toString() === params['user_goal_id'];
	});
	if (!goal) {
		return {
			goal: null,
			tasks: null
		};
	}

	const tasks = await getTasks(user.id, goal?.id);
	if (!tasks) {
		throw error(404, 'no tasks found.');
	}

	const archivedTasks = tasks.filter((task: Task) => task.is_archived === true && !task.completed);
	return {
		goal: goal as Goal,
		tasks: tasks.filter((task: Task) => task.is_archived === false || task.is_archived === null),
		archivedTasks: archivedTasks
	};
};
