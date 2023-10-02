import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`full_name, preferred_name, email, avatar_url`)
		.eq('id', session.user.id)
		.single();

	if (!profile) {
		throw new Error('User not found');
	}
	return {
		user: profile
	};
};
