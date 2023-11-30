import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';
import { isError, parseTimestamp } from '$lib/functions/utils';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, locals: { getAllCompletedTasks } }) => {
	const { goals, user } = await parent();

	const tasks = await getAllCompletedTasks(user.id);
	if (!tasks || isError(tasks)) {
		throw fail(400);
	}
	const defaultTime = '01 Jan 1970 00:00:00 GMT';

	// Ensure map is in order of most recent -> least recent
	tasks.sort(
		(a: Task, b: Task) =>
			Date.parse(b.target_date ?? defaultTime) - Date.parse(a.target_date ?? defaultTime)
	);

	// key is date in mm/dd/yyyy format
	const tasksByDate = new Map<string, Task[]>();
	tasks.forEach((task: Task) => {
		const timeStamp = parseTimestamp(task.completed_at!);
		if (timeStamp === -1) {
			return;
		}
		const date = new Date(timeStamp).toLocaleDateString('en-us');
		if (!tasksByDate.has(date)) {
			tasksByDate.set(date, [task]);
		} else {
			tasksByDate.get(date)!.push(task);
		}
	});

	return {
		goals: goals as Goal[],
		tasks: tasksByDate
	};
};
