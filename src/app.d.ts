import { SupabaseClient, Session, type PostgrestError } from '@supabase/supabase-js';
import { Database } from '$lib/types/database';
import { Goal, User, type UserSettings } from '$lib/types/sb';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getUser(id: string): Promise<User | PostgrestError | null>;
			getUserSettings(id: string): Promise<UserSettings | null>;
			getGoals(id: string): Promise<Goal[] | PostgrestError | null>;
			getTasks(user_id: string, goal_id: string | null): Promise<Task[] | null>;
			getTasksByDate(
				user_id: string,
				date?: string,
				operator: 'eq' | 'lt' | 'gte'
			): Promise<Task[] | null>;
			getAllCompletedTasks(user_id: string): Promise<Task[] | PostgrestError | null>;
			addGoal(
				user_id: string,
				goal_id: string | null,
				name: string,
				description: string,
				idx: number,
				target_date: string
			): Promise<Goal | PostgrestError>;
			addTask(
				user_id: string,
				goal_id: string | null,
				name: string,
				description: string,
				idx: number,
				target_date: string
			): Promise<Task | PostgrestError>;
			restoreTask(user_id: string, task_id: string): Promise<Task[]>;
			restoreTasks(user_id: string, task_ids: string[]): Promise<Task[]>;
			archiveTasks(user_id: string, task_ids?: string[]): Promise<Task[]>;
			updateUserSettings(user_id: string, week_start: DaysOfWeek): Promise<UserSettings>;
			deleteGoal(id: string, user_id: string): Promise<Goal[] | PostgrestError>;
			deleteTask(id: string, user_id: string): Promise<Task | PostgrestError>;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface Platform {}
	}
}

export {};
