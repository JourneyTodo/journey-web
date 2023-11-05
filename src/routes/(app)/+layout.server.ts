import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import type { Goal, User } from '$lib/types/sb';
import { signIn } from '$lib/constants/routes';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash(
	async ({ locals: { getSession, getGoals, getUser } }) => {
		const session = await getSession();

		if (!session) {
			throw redirect(303, signIn);
		}

		const profile = await getUser(session.user.id);

		if (!profile) {
			throw new Error('User not found');
		}

		const goals = await getGoals(session.user.id);

		return {
			user: profile as User,
			goals: goals as Goal[]
		};
	}
);
