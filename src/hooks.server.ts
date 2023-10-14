import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/types/database';
import type { Task } from '$lib/types/sb';
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

	event.locals.getUser = async (id: string) => {
		const { data: profile } = await event.locals.supabase
			.from('profiles')
			.select(`id, full_name, preferred_name, email, avatar_url, created_at, updated_at`)
			.eq('id', id)
			.single();
		return profile;
	};

	event.locals.getGoals = async (id: string) => {
		const { data: goals } = await event.locals.supabase
			.from('goals')
			.select(
				`completed, completed_at, created_at, description, id, index, name, parent_id, target_date, updated_at, user_id, user_goal_id`
			)
			.eq('user_id', id)
			.order('index', { ascending: true });

		return goals;
	};

	event.locals.addGoal = async (
		user_id: string,
		goal_id: string | null,
		name: string,
		description: string,
		idx: number
	) => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.insert({
				user_id,
				parent_id: goal_id,
				name,
				description,
				index: idx
			})
			.select();

		if (error) {
			throw error;
		}

		return data;
	};

	event.locals.deleteGoal = async (id: string, user_id: string) => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		if (error) {
			throw error;
		}

		return data;
	};

	event.locals.getTasks = async (id: string, goal_id: string | null = null) => {
		let tasks: Task[] | null = null;
		let err: PostgrestError | null = null;
		const query = `id, goal_id, user_id, user_task_id, name, description, created_at, updated_at, target_date, completed_at, completed, index, bucket`;

		if (goal_id === null) {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(query)
				.eq('user_id', id);

			tasks = data;
			err = error;
		} else {
			const { data, error } = await event.locals.supabase
				.from('tasks')
				.select(
					`completed, completed_at, created_at, description, id, goal_id, index, name, target_date, updated_at, user_id, user_task_id, bucket`
				)
				.eq('user_id', id)
				.eq('goal_id', goal_id);

			tasks = data;
			err = error;
		}

		if (err) {
			throw err;
		}

		return tasks;
	};

	event.locals.addTask = async (
		user_id: string,
		goal_id: string | null,
		name: string,
		description: string,
		idx: number
	) => {
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

		if (error) {
			throw error;
		}

		return data;
	};

	event.locals.deleteTask = async (id: string, user_id: string) => {
		const { data, error } = await event.locals.supabase
			.from('tasks')
			.delete()
			.eq('id', id)
			.eq('user_id', user_id)
			.select();

		if (error) {
			throw error;
		}

		return data;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
