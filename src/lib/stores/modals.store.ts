import type { Goal } from '$lib/types/sb';
import { writable } from 'svelte/store';

export const taskModalIsOpen = writable(false);
export const goalModalIsOpen = writable(false);
export const selectedGoal = writable<Goal | null>(null);
