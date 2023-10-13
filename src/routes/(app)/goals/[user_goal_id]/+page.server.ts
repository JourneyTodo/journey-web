import { redirect, type Actions } from '@sveltejs/kit';
import { baseRoutes } from '$lib/constants/routes';

export const actions: Actions = {
	delete: async ({ request, locals: { deleteGoal } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;
		const isParent = formData.get('isParent') as string;

		await deleteGoal(id, user_id);

		if (isParent === 'hi mom and dad!') {
			throw redirect(303, baseRoutes.goals);
		}

		return { success: true };
	}
};
