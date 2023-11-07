import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/types/database';
import type { Goal, Task, User } from '$lib/types/sb';
import type { PostgrestError } from '@supabase/supabase-js';

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

	event.locals.getUser = async (id: string): Promise<User | PostgrestError | null> => {
		const { data: profile, error } = await event.locals.supabase
			.from('profiles')
			.select(`id, full_name, preferred_name, email, avatar_url, created_at, updated_at`)
			.eq('id', id)
			.single();

		return error ?? profile;
	};

	event.locals.getGoals = async (id: string): Promise<Goal[] | PostgrestError> => {
		const { data: goals, error } = await event.locals.supabase
			.from('goals')
			.select(
				`completed, completed_at, created_at, description, id, index, name, parent_id, target_date, updated_at, user_id, user_goal_id, path`
			)
			.eq('user_id', id)
			.order('path');

		return error ?? goals;
	};

	event.locals.addGoal = async (
		user_id: string,
		goal_id: string | null,
		name: string,
		description: string,
		idx: number
	): Promise<Goal | PostgrestError> => {
		if (!name) {
			return {
				message: 'Name is either empty, null, or undefined.',
				details: '',
				hint: '',
				code: '400'
			} as PostgrestError;
		}

		const { data, error } = await event.locals.supabase
			.from('goals')
			.insert({
				user_id,
				parent_id: goal_id,
				name,
				description,
				index: idx
			})
			.select()
			.single();

		return error ?? data;
	};

	event.locals.deleteGoal = async (
		id: string,
		user_id: string
	): Promise<Goal[] | PostgrestError> => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		return error ?? data;
	};

	event.locals.getTasks = async (
		id: string,
		goal_id: string | null = null
	): Promise<Task[] | PostgrestError | null> => {
		let tasks: Task[] | null = null;
		let err: PostgrestError | null = null;
		const query = `id, goal_id, user_id, user_task_id, name, description, created_at, updated_at, target_date, completed_at, completed, index, bucket`;

		if (goal_id === null) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', id)
				.filter('goal_id', 'is', 'null');

			tasks = data;
			err = error;
		} else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', id)
				.eq('goal_id', goal_id);

			tasks = data;
			err = error;
		}

		return err ?? tasks;
	};

	event.locals.addTask = async (
		user_id: string,
		goal_id: string | null,
		name: string | null,
		description: string,
		idx: number
	): Promise<Task[] | PostgrestError> => {
		let err: PostgrestError | null = null;
		let tasks: Task[];

		if (!name) {
			return {
				message: 'Name is either empty, null, or undefined.',
				details: '',
				hint: '',
				code: '400'
			} as PostgrestError;
		}

		if (!goal_id) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.insert({
					user_id,
					name,
					description,
					index: idx
				})
				.select();
			tasks = data!;
			err = error;
		} else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.insert({
					user_id,
					goal_id,
					name,
					description,
					index: idx
				})
				.select();
			tasks = data!;
			err = error;
		}
		return err ?? tasks;
	};

	event.locals.deleteTask = async (
		id: string,
		user_id: string
	): Promise<Task[] | PostgrestError> => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		return error ?? data;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
