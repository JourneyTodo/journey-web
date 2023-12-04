/**
 * Supabase helper types to be used throughout the app
 */

import type { Database } from './database';

export type Row<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];

export type Goal = Row<'goals'>;

export type User = Row<'profiles'>;

export type Task = Row<'tasks'>;

export type UserSettings = Row<'user_settings'>;
