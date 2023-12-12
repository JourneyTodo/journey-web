import { SupabaseClient, Session } from '@supabase/supabase-js';
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
			getUser(id: string): Promise<Result<User>>;
			getUserSettings(id: string): Promise<Result<UserSettings>>;
			getGoals(id: string): Promise<Result<Goal[]>>;
			getTasks(user_id: string, goal_id: string | null): Promise<Result<Task[]>>;
			getTasksByDate(
				user_id: string,
				date?: string,
				operator: 'eq' | 'lt' | 'gte'
			): Promise<Result<Task[]>>;
			getAllCompletedTasks(user_id: string): Promise<Result<Task[]>>;
			addGoal(
				user_id: string,
				goal_id: string | null,
				name: string,
				description: string,
				idx: number,
				target_date: string
			): Promise<Result<Goal>>;
			addTask(
				user_id: string,
				goal_id: string | null,
				name: string,
				description: string,
				idx: number,
				target_date: string
			): Promise<Result<Task>>;
			restoreTask(user_id: string, task_id: string): Promise<Result<Task>>;
			restoreTasks(user_id: string, task_ids: string[]): Promise<Result<Task[]>>;
			archiveTasks(user_id: string, task_ids?: string[]): Promise<Result<Task[]>>;
			updateTask(
				user_id: string,
				task_id: string,
				goal_id: string | null,
				name: string,
				description: string,
				target_date: string
			): Promise<Result<Task>>;
			updateUserSettings(user_id: string, week_start: DaysOfWeek): Promise<Result<UserSettings>>;
			deleteGoal(id: string, user_id: string): Promise<Result<Goal[]>>;
			deleteTask(id: string, user_id: string): Promise<Result<Task[]>>;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface Platform {}
	}
}

export {};
