/**
 * Supabase helper types to be used throughout the app
 */

import type { PostgrestError } from '@supabase/supabase-js';
import type { Database } from './database';

export type Row<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];

// Perhaps wrap these types in Partial<>
export type Goal = Row<'goals'>;

export type User = Row<'profiles'>;

export type Task = Row<'tasks'>;

export type UserSettings = Row<'user_settings'>;

export type Result<T> = {
	data?: T | null;
	error?: PostgrestError | null;
};
