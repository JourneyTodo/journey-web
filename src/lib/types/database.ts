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
					path: unknown | null;
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
					path?: unknown | null;
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
					path?: unknown | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_goal_id?: number;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'goals_parent_id_fkey';
						columns: ['parent_id'];
						isOneToOne: false;
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
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			tasks: {
				Row: {
					bucket: number | null;
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					goal_id: string | null;
					id: string;
					index: number | null;
					is_archived: boolean | null;
					name: string | null;
					target_date: string | null;
					updated_at: string | null;
					user_id: string | null;
					user_task_id: number;
				};
				Insert: {
					bucket?: number | null;
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id?: string | null;
					id?: string;
					index?: number | null;
					is_archived?: boolean | null;
					name?: string | null;
					target_date?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
					user_task_id?: number;
				};
				Update: {
					bucket?: number | null;
					completed?: boolean | null;
					completed_at?: string | null;
					created_at?: string;
					description?: string | null;
					goal_id?: string | null;
					id?: string;
					index?: number | null;
					is_archived?: boolean | null;
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
						isOneToOne: false;
						referencedRelation: 'goals';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tasks_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
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
			decrement_goal_indices:
				| {
						Args: {
							exclude_id: string;
							new_pid: string;
							new_index: number;
							old_index: number;
						};
						Returns: {
							completed: boolean | null;
							completed_at: string | null;
							created_at: string;
							description: string | null;
							id: string;
							index: number | null;
							name: string;
							parent_id: string | null;
							path: unknown | null;
							target_date: string | null;
							updated_at: string | null;
							user_goal_id: number;
							user_id: string | null;
						}[];
				  }
				| {
						Args: {
							new_id: string;
							new_pid: string;
							new_index: number;
						};
						Returns: {
							completed: boolean | null;
							completed_at: string | null;
							created_at: string;
							description: string | null;
							id: string;
							index: number | null;
							name: string;
							parent_id: string | null;
							path: unknown | null;
							target_date: string | null;
							updated_at: string | null;
							user_goal_id: number;
							user_id: string | null;
						}[];
				  };
			gen_index: {
				Args: {
					p_id: string;
				};
				Returns: number;
			};
			gen_user_goal_id: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			gen_user_task_id: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			generate_numeric_id: {
				Args: Record<PropertyKey, never>;
				Returns: number;
			};
			get_goals_tree: {
				Args: Record<PropertyKey, never>;
				Returns: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					path: unknown | null;
					target_date: string | null;
					updated_at: string | null;
					user_goal_id: number;
					user_id: string | null;
				}[];
			};
			increment_goal_indices: {
				Args: {
					exclude_id: string;
					new_pid: string;
					new_index: number;
					old_index: number;
				};
				Returns: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					path: unknown | null;
					target_date: string | null;
					updated_at: string | null;
					user_goal_id: number;
					user_id: string | null;
				}[];
			};
			materialize_path:
				| {
						Args: {
							id: number;
						};
						Returns: unknown;
				  }
				| {
						Args: {
							user_goal_id: number;
							parent_id: string;
						};
						Returns: unknown;
				  };
			update_goal_indices: {
				Args: {
					new_id: string;
					new_pid: string;
					new_index: number;
					old_index: number;
				};
				Returns: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					path: unknown | null;
					target_date: string | null;
					updated_at: string | null;
					user_goal_id: number;
					user_id: string | null;
				}[];
			};
			update_goal_indices_null_parent: {
				Args: {
					new_id: string;
					new_index: number;
				};
				Returns: {
					completed: boolean | null;
					completed_at: string | null;
					created_at: string;
					description: string | null;
					id: string;
					index: number | null;
					name: string;
					parent_id: string | null;
					path: unknown | null;
					target_date: string | null;
					updated_at: string | null;
					user_goal_id: number;
					user_id: string | null;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			goals_with_level: {
				parent_id: string;
				id: string;
				user_id: string;
				index: number;
				created_at: string;
				updated_at: string;
				target_date: string;
				completed_at: string;
				completed: boolean;
				user_goal_id: number;
				name: string;
				description: string;
				level: number;
				path: unknown;
			};
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
			Database['public']['Views'])
	? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never;
