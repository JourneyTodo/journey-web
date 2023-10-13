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
			addGoal(
				user_id: string,
				name: string,
				description: string,
				idx: number
			): Promise<Goal | PostgrestError>;
			deleteGoal(id: string, user_id: string): Promise<Goal | PostgrestError>;
			getTasks(id: string, goal_id: string | null): Promise<Task[] | PostgrestError>;
			addTask(
				user_id: string,
				name: string,
				description: string,
				idx: number
			): Promise<Task | PostgrestError>;
			deleteTask(id: string, user_id: string): Promise<Task | PostgrestError>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
