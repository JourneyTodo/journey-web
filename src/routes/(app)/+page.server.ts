import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addGoal: async ({ request, locals: { addGoal } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const user_id = formData.get('user_id') as string;

		const result = await addGoal(user_id, name, description, idx);

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

		const result = await addTask(user_id, name, description, idx);

		if (result instanceof Error) {
			return { error: result };
		}

		return { success: true };
	}
};
