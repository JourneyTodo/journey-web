import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	addGoal: async ({ request, locals: { addGoal } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const uid = formData.get('uid') as string;

		console.log(name, description, idx, uid);

		console.log('adding goal');

		const result = await addGoal(uid, name, description, idx);

		console.log('added goal', result);

		return { success: true };
	}
};
