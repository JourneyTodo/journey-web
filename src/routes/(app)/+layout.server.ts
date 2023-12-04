import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import type { Goal, User, UserSettings } from '$lib/types/sb';
import { signIn } from '$lib/constants/routes';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash(
	async ({ locals: { getSession, getGoals, getUser, getUserSettings, archiveTasks } }) => {
		const session = await getSession();

		if (!session) {
			throw redirect(303, signIn);
		}
		const id = session.user.id;

		const profile = await getUser(id);

		if (!profile) {
			console.error('User not found');
			throw redirect(303, signIn);
		}

		const settings = await getUserSettings(id);
		if (!settings) {
			console.error('User settings not found');
		}
		const goals = await getGoals(id);

		// archive tasks on initial load
		const today = new Date();
		if (settings && today.getDay() === settings.week_start) {
			await archiveTasks(id);
		}

		return {
			user: profile as User,
			settings: settings as UserSettings,
			goals: goals as Goal[]
		};
	}
);
