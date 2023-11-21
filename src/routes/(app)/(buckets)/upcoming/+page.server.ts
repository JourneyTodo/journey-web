import { formatDate, isError } from '$lib/functions/utils';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals: { getTasksByDate } }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, signIn);
	}
	const today = formatDate(new Date());
	const result = getTasksByDate(session.user.id, today, 'gt');
	if (result && !isError(result)) {
		return {
			tasks: result
		};
	}
};
