export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			goals: {
				Row: {
					completed: boolean;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					target_date: string | null;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					completed?: boolean;
					completed_at?: string | null;
					created_at: string;
					description?: string | null;
					id?: string;
					index?: number | null;
					name: string;
					parent_id?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					completed?: boolean;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					id?: string;
					index?: number | null;
					name?: string;
					parent_id?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'goals_parent_id_fkey';
						columns: ['parent_id'];
						referencedRelation: 'goals';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'goals_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string;
					full_name: string | null;
					id: string;
					preferred_name: string | null;
					updated_at: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string;
					full_name?: string | null;
					id?: string;
					preferred_name?: string | null;
					updated_at?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string;
					full_name?: string | null;
					id?: string;
					preferred_name?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			tasks: {
				Row: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					goal_id: string;
					id: string;
					name: string | null;
					target_date: string | null;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id: string;
					id?: string;
					name?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id?: string;
					id?: string;
					name?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string;
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
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
