import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { listToTree } from '$lib/functions/mapping';

export const load: LayoutServerLoad = async ({
	locals: { supabase, getSession, getUser, getGoals }
}) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`full_name, preferred_name, email, avatar_url, created_at`)
		.eq('id', session.user.id)
		.single();

	if (!profile) {
		throw new Error('User not found');
	}

	const { data: goals } = await supabase
		.from('goals')
		.select(
			`completed, completed_at, created_at, description, id, index, name, parent_id, target_date, updated_at, user_id`
		)
		.eq('user_id', session.user.id);

	let treeGoals = null;
	if (goals) {
		treeGoals = listToTree(goals);
	}

	return {
		user: profile,
		goals: treeGoals
	};
};
