import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/types/database';

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
			.eq('user_id', id);
		return goals;
	};

	event.locals.addGoal = async (uid: string, name: string, description: string, idx: number) => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.insert({
				user_id: uid,
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

	event.locals.deleteGoal = async (id: string) => {
		const { data, error } = await event.locals.supabase
			.from('goals')
			.delete()
			.eq('id', id)
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
