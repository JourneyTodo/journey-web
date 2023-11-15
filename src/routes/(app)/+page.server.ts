// import type { Message } from '$lib/messageHandler';
import { setFlash } from 'sveltekit-flash-message/server';

import {
	goalAdded,
	goalDeleted,
	taskAdded,
	taskCompleted,
	taskDeleted
} from '$lib/constants/messages';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PostgrestError } from '@supabase/supabase-js';
import { baseRoutes } from '$lib/constants/routes';

function isError(data: PostgrestError): data is PostgrestError {
	return 'message' in data && 'details' in data && 'hint' in data && 'code' in data;
}

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

		const result = await addGoal(user_id, goal_id, name, description, idx);
		const msg = goalAdded(name);
		if (isError(result)) {
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

		const result = await addTask(user_id, goal_id, name, description, idx);
		const msg = user_goal_id
			? taskAdded(`/goals/${user_goal_id}`, goal_name)
			: taskAdded('/inbox', goal_name);
		if (isError(result)) {
			setFlash(msg.error, event);
			return { success: false };
		}

		setFlash(msg.success, event);

		return { success: true };
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
				completed
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
