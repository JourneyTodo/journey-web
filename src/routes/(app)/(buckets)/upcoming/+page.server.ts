import { formatDate, getNextDay, isError } from '$lib/functions/utils';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals: { getTasksByDate } }) => {
	const { session } = await parent();
	if (!session) {
		throw redirect(302, signIn);
	}
	const nextDay = formatDate(getNextDay(new Date()));
	const result = getTasksByDate(session.user.id, nextDay, 'gte');
	if (result && !isError(result)) {
		return {
			tasks: result
		};
	}
};
