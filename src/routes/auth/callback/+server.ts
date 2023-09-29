import { home } from '$lib/constants/routes.js';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	// Get the auth code from the query string
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, home);
};
