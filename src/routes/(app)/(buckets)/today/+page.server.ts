import { formatDate, getNextDay, isError } from '$lib/functions/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/constants/routes';

export const load: PageServerLoad = async ({ parent, locals: { getTasksByDate } }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, signIn);
	}
	const tomorrow = formatDate(getNextDay(new Date()));
	const result = await getTasksByDate(session.user.id, tomorrow, 'lt');
	if (result && !isError(result)) {
		return {
			tasks: result
		};
	}
};
