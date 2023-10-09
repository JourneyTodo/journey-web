import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	delete: async ({ request, locals: { deleteGoal } }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id') as string);

		console.log('deleting goal', id);

		const result = await deleteGoal(id);

		console.log('deleted goal', result);

		return { success: true };
	}
};
