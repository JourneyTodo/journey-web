import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addGoal: async ({ request, locals: { addGoal } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const uid = formData.get('uid') as string;

		const result = await addGoal(uid, name, description, idx);

		if (result instanceof Error) {
			return { error: result };
		}

		return { success: true };
	}
};
