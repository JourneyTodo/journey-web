import type { Task } from '$lib/types/sb';
import { isError, isSameDay } from '$lib/functions/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { tasks } = await parent();
	if (tasks && !isError(tasks)) {
		return {
			tasks: tasks.filter((t: Task) => {
				return isSameDay(new Date(t.target_date!), new Date());
			})
		};
	}
};
