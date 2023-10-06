import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { listToTree } from '$lib/functions/mapping';
import type { Goal, User } from '$lib/types/sb';

export const load: LayoutServerLoad = async ({
	url,
	locals: { getSession, getGoals, getUser }
}) => {
	// For now, just check for addGoal param
	// This should probably be extended to check for any params
	const addGoal = url.searchParams.get('addGoal') === '' ? true : false;

	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const profile = await getUser(session.user.id);

	if (!profile) {
		throw new Error('User not found');
	}

	const goals = await getGoals(session.user.id);

	let treeGoals = null;
	if (goals) {
		treeGoals = listToTree(goals);
	}

	return {
		user: profile as User,
		goals: treeGoals as Goal[],
		flatGoals: goals as Goal[],
		addGoal: addGoal
	};
};
