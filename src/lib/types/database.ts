export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			goals: {
				Row: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					target_date: string | null;
					updated_at: string | null;
					user_goal_id: number;
					user_id: string | null;
				};
				Insert: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					index?: number | null;
					name: string;
					parent_id?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_goal_id?: number;
					user_id?: string | null;
				};
				Update: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					index?: number | null;
					name?: string;
					parent_id?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_goal_id?: number;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'goals_parent_id_fkey';
						columns: ['parent_id'];
						referencedRelation: 'goals';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string;
					email: string | null;
					full_name: string | null;
					id: string;
					preferred_name: string | null;
					updated_at: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					full_name?: string | null;
					id: string;
					preferred_name?: string | null;
					updated_at?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					full_name?: string | null;
					id?: string;
					preferred_name?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			tasks: {
				Row: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					goal_id: string | null;
					id: string;
					index: number | null;
					name: string | null;
					target_date: string | null;
					updated_at: string | null;
					user_id: string | null;
					user_task_id: number;
				};
				Insert: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id?: string | null;
					id?: string;
					index?: number | null;
					name?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
					user_task_id?: number;
				};
				Update: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id?: string | null;
					id?: string;
					index?: number | null;
					name?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
					user_task_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'tasks_goal_id_fkey';
						columns: ['goal_id'];
						referencedRelation: 'goals';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tasks_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			gen_user_goal_id: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			gen_user_task_id: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
