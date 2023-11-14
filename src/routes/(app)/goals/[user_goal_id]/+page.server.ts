import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';

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

	return {
		goal: goal as Goal,
		tasks: tasks as Task[]
	};
};
