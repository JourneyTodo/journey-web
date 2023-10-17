import { redirect, type Actions } from '@sveltejs/kit';
import { baseRoutes } from '$lib/constants/routes';
import type { PageServerLoad } from './$types';
import type { Task } from 'vitest';
import type { Goal } from '$lib/types/sb';

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

export const actions: Actions = {
	deleteGoal: async ({ request, locals: { deleteGoal } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;
		const isParent = formData.get('isParent') as string;

		await deleteGoal(id, user_id);

		if (isParent === 'hi mom and dad!') {
			throw redirect(303, baseRoutes.goals);
		}

		return { success: true };
	},

	deleteTask: async ({ request, locals: { deleteTask } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;

		await deleteTask(id, user_id);

		return { success: true };
	}
};
