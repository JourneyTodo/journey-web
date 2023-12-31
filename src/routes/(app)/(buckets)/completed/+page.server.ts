import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';
import { parseTimestamp } from '$lib/functions/utils';

export const load: PageServerLoad = async ({ parent, locals: { getAllCompletedTasks } }) => {
	const { goals, user } = await parent();

	const { data: tasks, error } = await getAllCompletedTasks(user.id);
	if (error) {
		console.error(404, 'no tasks found.', error);
		return;
	}
	const defaultTime = '01 Jan 1970 00:00:00 GMT';

	// Ensure map is in order of most recent -> least recent
	tasks.sort(
		(a: Task, b: Task) =>
			Date.parse(b.completed_at ?? defaultTime) - Date.parse(a.completed_at ?? defaultTime)
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
