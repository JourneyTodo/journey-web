import type { Goal, Task } from '$lib/types/sb';
import { writable } from 'svelte/store';

export const taskModalIsOpen = writable(false);
export const goalModalIsOpen = writable(false);
export const selectedGoal = writable<Goal | null>(null);

export const deleteModalIsOpen = writable(false);

export const currentGoal = writable<Goal | null>(null);
export const currentTask = writable<Task | null>(null);
export const currentTasks = writable<Task[]>([]);
export const currentDate = writable<string | null>(null);
