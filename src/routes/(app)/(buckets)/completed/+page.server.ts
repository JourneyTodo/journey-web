import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';

export const load: PageServerLoad = async ({ parent, locals: { getAllCompletedTasks } }) => {
	const { goals, user } = await parent();

	const tasks = await getAllCompletedTasks(user.id);

	return {
		goals: goals as Goal[],
		tasks: tasks as Task[]
	};
};
