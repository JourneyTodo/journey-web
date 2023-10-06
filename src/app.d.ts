import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from '$lib/types/database';
import { Goal, User } from '$lib/types/sb';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getUser(id: string): Promise<User | null>;
			getGoals(id: string): Promise<Goal[] | null>;
			createGoal(goal: Goal): Promise<Goal | null>;
			deleteGoal(goal: Goal): Promise<Goal | null>;
			upsertGoal(goal: Goal): Promise<Goal | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
