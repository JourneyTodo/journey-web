import { AuthApiError } from '@supabase/gotrue-js';
import type { Provider, SupabaseClient } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { PROVIDERS } from '$lib/constants/providers.js';

export const actions = {
	signin: async ({ request, url, locals: { supabase } }) => {
		const provider = url.searchParams.get('provider') as Provider;

		const response = provider
			? await signInWithProvider(url, provider, supabase)
			: await signInDefault(request, supabase);

		if (response.success) {
			throw redirect(303, '/');
		}

		// Return form error
		return response;
	}
};

async function signInDefault(request: Request, supabase: SupabaseClient) {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error && error instanceof AuthApiError) {
		if (error.status === 400) {
			return fail(400, {
				error: 'Invalid credentials',
				email
			});
		}
		return fail(500, {
			error: 'Server error. Try again later.',
			email
		});
	}
	return { success: true };
}

async function signInWithProvider(url: URL, provider: Provider, supabase: SupabaseClient) {
	// If the provider is not supported, return a 400
	if (!PROVIDERS.includes(provider)) {
		return fail(400, {
			error: `Provider ${provider} either does not exist or is not supported."`
		});
	}

	// Sign in with the provider
	const { error: err } = await supabase.auth.signInWithOAuth({
		provider: provider,
		options: {
			// Send the, to the callback to exchange the code for a session cookie
			redirectTo: `${url.origin}/auth/callback`
		}
	});

	// If there's an error returned from signing in, return a 500 with the error
	if (err) {
		return fail(500, {
			error: err.message
		});
	}

	return { success: true };
}
