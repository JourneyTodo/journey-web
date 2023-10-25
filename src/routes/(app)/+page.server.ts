import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addGoal: async ({ request, locals: { addGoal } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const user_id = formData.get('user_id') as string;
		const goal_id =
			(formData.get('goal_id') as string) !== '' ? (formData.get('goal_id') as string) : null;

		const result = await addGoal(user_id, goal_id, name, description, idx);

		if (result instanceof Error) {
			return { error: result };
		}

		return { success: true };
	},

	addTask: async ({ request, locals: { addTask } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const user_id = formData.get('user_id') as string;
		const goal_id = formData.get('goal_id') as string;

		const result = await addTask(user_id, goal_id, name, description, idx);

		if (result instanceof Error) {
			return { error: result };
		}

		return { success: true };
	},

	completeTask: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const completed = formData.get('completed') === 'true';

		const result = await supabase
			.from('tasks')
			.update({
				completed
			})
			.eq('id', id);

		if (result instanceof Error) {
			return { error: result };
		}

		return { success: true };
	}
};
