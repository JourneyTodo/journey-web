import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '$lib/types/database';

/**
 * To utilize Supabase in shared load functions and within pages,
 * it is essential to create a Supabase client in the root layout load.
 */
export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth'); // tells sveltekit this load function should be re-run when the auth session changes

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	// fetch the session from supabase auth server
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// return an object with the supabase client and session
	return { supabase, session };
};
