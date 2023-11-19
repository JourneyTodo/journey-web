import type { PageServerLoad } from './$types';
import type { Goal, Task } from '$lib/types/sb';
import { parseTimestamp } from '$lib/functions/utils';

export const load: PageServerLoad = async ({ parent, locals: { getAllCompletedTasks } }) => {
	const { goals, user } = await parent();

	const tasks = await getAllCompletedTasks(user.id);

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
