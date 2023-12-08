// import type { Message } from '$lib/messageHandler';
import { setFlash } from 'sveltekit-flash-message/server';

import {
	goalAdded,
	goalDeleted,
	settingsUpdated,
	taskAdded,
	taskCompleted,
	taskDeleted,
	taskPostponed,
	taskRescheduled,
	taskRestored
} from '$lib/constants/messages';
import { redirect, type Actions } from '@sveltejs/kit';
import { baseRoutes } from '$lib/constants/routes';
import { getDayToNumber, getNextDay } from '$lib/functions/utils';
import type { dayOfWeek } from '$lib/constants/DaysOfWeek.enum';

export const actions: Actions = {
	addGoal: async (event) => {
		const {
			request,
			locals: { addGoal }
		} = event;
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const user_id = formData.get('user_id') as string;
		const goal_id =
			(formData.get('goal_id') as string) !== '' ? (formData.get('goal_id') as string) : null;
		const target_date = Date.parse(formData.get('target_date') as string);
		const msg = goalAdded(name);

		if (isNaN(target_date)) {
			setFlash(msg.error, event);
			console.error('Form sent incorrect date format.');
			return { success: false };
		}

		const { error } = await addGoal(
			user_id,
			goal_id,
			name,
			description,
			idx,
			new Date(target_date).toISOString()
		);
		if (error) {
			console.error(error);
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);

		return { success: true };
	},

	addTask: async (event) => {
		const {
			request,
			locals: { addTask }
		} = event;
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const idx = parseInt(formData.get('idx') as string);
		const user_id = formData.get('user_id') as string;
		const goal_name = formData.get('goal_name') as string;
		const goal_id = formData.get('goal_id') as string;
		const user_goal_id = formData.get('user_goal_id') as string;
		const target_date = Date.parse(formData.get('target_date') as string);
		const msg = user_goal_id
			? taskAdded(`/goals/${user_goal_id}`, goal_name)
			: taskAdded('/inbox', goal_name);

		if (isNaN(target_date)) {
			setFlash(msg.error, event);
			console.error('Form sent incorrect date format.');
			return { success: false };
		}

		const { error } = await addTask(
			user_id,
			goal_id,
			name,
			description,
			idx,
			new Date(target_date).toISOString()
		);

		if (error) {
			console.error(error);
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);

		return { success: true };
	},

	// TODO
	updateTask: async () => {
		return;
	},

	// postpone task till tomorrow
	postponeTask: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;
		// new day
		const tomorrow = getNextDay(new Date());

		const { error } = await supabase
			.from('tasks')
			.update({
				target_date: new Date(tomorrow).toISOString(),
				updated_at: new Date().toISOString()
			})
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		const msg = taskPostponed();
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}
		setFlash(msg.success, event);

		return { success: true };
	},

	rescheduleTask: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;
		const today = formData.get('target_date') as string;

		const { error } = await supabase
			.from('tasks')
			.update({
				target_date: today,
				updated_at: new Date().toISOString()
			})
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		const msg = taskRescheduled();
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}
		setFlash(msg.success, event);

		return { success: true };
	},

	restoreTask: async (event) => {
		const {
			request,
			locals: { restoreTask }
		} = event;

		const formData = await request.formData();
		const task_id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;

		const { error } = await restoreTask(user_id, task_id);

		const msg = taskRestored();
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}
		setFlash(msg.success, event);
		return { success: true };
	},

	restoreTasks: async (event) => {
		const {
			request,
			locals: { restoreTasks }
		} = event;

		const formData = await request.formData();
		const task_ids = (formData.get('ids') as string).split(',');
		const user_id = formData.get('user_id') as string;

		const { error } = await restoreTasks(user_id, task_ids);

		const msg = taskRestored();
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}
		setFlash(msg.success, event);
		return { success: true };
	},

	// TODO
	updateGoal: async () => {
		return;
	},

	completeTask: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const completed = formData.get('completed') === 'true';

		const { error } = await supabase
			.from('tasks')
			.update({
				completed,
				completed_at: completed ? new Date().toISOString() : null,
				updated_at: new Date().toISOString()
			})
			.eq('id', id)
			.select();
		const msg = taskCompleted(!completed);

		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);

		return { success: true };
	},

	settings: async (event) => {
		const {
			request,
			locals: { updateUserSettings }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const day = formData.get('week_start') as dayOfWeek;
		const dayAsNum = getDayToNumber(day);
		const msg = settingsUpdated;

		if (!dayAsNum) {
			setFlash(msg.error, event);
			return { success: false };
		}

		const data = await updateUserSettings(id, dayAsNum);

		if (!data) {
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);
		return { success: true };
	},

	deleteGoal: async (event) => {
		const {
			request,
			locals: { deleteGoal }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;

		const { error } = await deleteGoal(id, user_id);

		const msg = goalDeleted;
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);
		throw redirect(303, baseRoutes.goals);
	},

	deleteTask: async (event) => {
		const {
			request,
			locals: { deleteTask }
		} = event;
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const user_id = formData.get('user_id') as string;

		const { error } = await deleteTask(id, user_id);

		const msg = taskDeleted;
		if (error) {
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);
		return { success: true };
	}
};
