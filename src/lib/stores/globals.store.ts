import type { Goal } from '$lib/types/sb';
import { writable } from 'svelte/store';

export const goals = writable<Goal[] | null>(null);
export const editingTask = writable<boolean>(false);
