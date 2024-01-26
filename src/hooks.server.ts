import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/types/database';
import type { Goal, Result, Task, User, UserSettings } from '$lib/types/sb';
import type { PostgrestError } from '@supabase/supabase-js';
import { formatDate, isValidDate } from '$lib/functions/utils';
import type { DaysOfWeek } from '$lib/constants/DaysOfWeek.enum';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getUser = async (id: string): Promise<Result<User>> => {
		const { data, error } = await event.locals.supabase
			.from('profiles')
			.select(`id, full_name, preferred_name, email, avatar_url, created_at, updated_at`)
			.eq('id', id)
			.single();

		return { data, error };
	};

	event.locals.getUserSettings = async (id: string): Promise<Result<UserSettings>> => {
		const { data, error } = await event.locals.supabase
			.from('user_settings')
			.select(`*`)
			.eq('user_id', id)
			.single();

		return { data, error };
	};

	event.locals.getGoals = async (id: string): Promise<Result<Goal[]>> => {
		const { data: goals, error } = await event.locals.supabase
			.from('goals')
			.select(
				`completed, completed_at, created_at, description, id, index, name, parent_id, target_date, updated_at, user_id, user_goal_id, path`
			)
			.eq('user_id', id)
			.order('path');

		return { data: goals, error };
	};

	event.locals.getTasks = async (
		user_id: string,
		goal_id: string | null = null
	): Promise<Result<Task[]>> => {
		let tasks: Task[] | null = null;
		let err: PostgrestError | null = null;
		const query = `id, goal_id, user_id, user_task_id, name, description, created_at, updated_at, target_date, completed_at, completed, index, bucket, is_archived`;
		if (goal_id === null) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', user_id)
				.is('goal_id', null)
				.order('completed')
				.order('created_at');

			tasks = data;
			err = error;
		} else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', user_id)
				.eq('goal_id', goal_id)
				.order('completed')
				.order('created_at');

			tasks = data;
			err = error;
		}
		return { data: tasks, error: err };
	};

	event.locals.getTasksByDate = async (
		user_id: string,
		date: string,
		operator: 'eq' | 'lt' | 'gte' = 'eq'
	): Promise<Result<Task[]>> => {
		const query = `id, goal_id, user_id, user_task_id, name, description, created_at, updated_at, target_date, completed_at, completed, index, bucket, is_archived`;
		let tasks: Task[] | null = null;
		let err: PostgrestError | null = null;
		if (!isValidDate(date)) {
			return {
				error: {
					message: 'The date provided is not valid.',
					details: '',
					hint: '',
					code: '400'
				} as PostgrestError
			};
		}
		if (operator === 'lt') {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', user_id)
				.lt('target_date', date)
				.neq('completed', true);
			tasks = data;
			err = error;
		} else if (operator === 'gte') {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', user_id)
				.gte('target_date', date)
				.neq('completed', true);
			tasks = data;
			err = error;
		}
		return { data: tasks, error: err };
	};

	event.locals.getAllCompletedTasks = async (user_id: string): Promise<Result<Task[]>> => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.select()
			.eq('user_id', user_id)
			.eq('completed', true);

		return { data, error };
	};

	event.locals.addGoal = async (
		user_id: string,
		goal_id: string | null,
		name: string,
		description: string,
		idx: number,
		target_date: string
	): Promise<Result<Goal>> => {
		if (!name) {
			return {
				data: null,
				error: {
					message: 'Name is either empty, null, or undefined.',
					details: '',
					hint: '',
					code: '400'
				} as PostgrestError
			};
		}

		const { data, error } = await event.locals.supabase
			.from('goals')
			.insert({
				user_id,
				parent_id: goal_id,
				name,
				description,
				index: idx,
				target_date
			})
			.select()
			.single();
		return { data, error };
	};

	event.locals.restoreTask = async (user_id: string, task_id: string): Promise<Result<Task>> => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.update({
				is_archived: false,
				target_date: formatDate(new Date()),
				updated_at: new Date().toISOString()
			})
			.eq('user_id', user_id)
			.eq('id', task_id)
			.select()
			.single();
		return { data, error };
	};

	event.locals.restoreTasks = async (
		user_id: string,
		task_ids: string[]
	): Promise<Result<Task[]>> => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.update({
				is_archived: false,
				target_date: formatDate(new Date()),
				updated_at: new Date().toISOString()
			})
			.eq('user_id', user_id)
			.in('id', task_ids)
			.select();
		return { data, error };
	};

	event.locals.archiveTasks = async (
		user_id: string,
		task_ids: string[]
	): Promise<Result<Task[]>> => {
		if (task_ids && task_ids.length > 0) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.update({
					is_archived: true,
					updated_at: new Date().toISOString()
				})
				.eq('user_id', user_id)
				.neq('completed', true)
				.in('id', task_ids)
				.select();
			return { data, error };
		}
		// archive all tasks older than today
		else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.update({
					is_archived: true,
					updated_at: new Date().toISOString()
				})
				.eq('user_id', user_id)
				.neq('completed', true)
				.lt('target_date', formatDate(new Date()))
				.select();

			return { data, error };
		}
	};

	event.locals.updateUserSettings = async (
		user_id: string,
		week_start: DaysOfWeek
	): Promise<Result<UserSettings>> => {
		const { data, error } = await event.locals.supabase
			.from('user_settings')
			.update({
				week_start: week_start
			})
			.eq('user_id', user_id)
			.select()
			.single();

		return { data, error };
	};

	event.locals.updateTask = async (
		user_id: string,
		task_id: string,
		goal_id: string | null,
		name: string,
		description: string,
		target_date: string
	): Promise<Result<Task>> => {
		if (goal_id !== null) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.update({
					name: name,
					description: description,
					goal_id: goal_id,
					target_date: new Date(target_date).toISOString(),
					updated_at: new Date().toISOString()
				})
				.eq('id', task_id)
				.eq('user_id', user_id)
				.select()
				.single();
			return { data, error };
		}
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.update({
				name: name,
				description: description,
				target_date: new Date(target_date).toISOString(),
				updated_at: new Date().toISOString()
			})
			.eq('id', task_id)
			.eq('user_id', user_id)
			.select()
			.single();
		return { data, error };
	};

	event.locals.deleteGoal = async (id: string, user_id: string): Promise<Result<Goal[]>> => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		return { data, error };
	};

	event.locals.addTask = async (
		user_id: string,
		goal_id: string | null,
		name: string | null,
		description: string,
		idx: number,
		target_date: string
	): Promise<Result<Task>> => {
		let err: PostgrestError | null = null;
		let task: Task;

		if (!name) {
			return {
				error: {
					message: 'Name is either empty, null, or undefined.',
					details: '',
					hint: '',
					code: '400'
				} as PostgrestError
			};
		}

		if (!goal_id) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.insert({
					user_id,
					name,
					description,
					index: idx,
					target_date
				})
				.select()
				.single();
			task = data!;
			err = error;
		} else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.insert({
					user_id,
					goal_id,
					name,
					description,
					index: idx,
					target_date
				})
				.select()
				.single();
			task = data!;
			err = error;
		}
		return { data: task, error: err };
	};

	event.locals.deleteTask = async (id: string, user_id: string): Promise<Result<Task[]>> => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		return { data, error };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
