import type { Goal } from '$lib/types/sb';
import type { SupabaseClient } from '@supabase/supabase-js';

type Params = {
	excludeId: string;
	newParentId: string | null;
	newIndex?: number;
	oldIndex: number;
};

/**
 * Updates the paths for the given nodes and returns the full list of goals after changes
 * @param sb
 * @param goals
 */
export async function updateGoalOrder(
	sb: SupabaseClient,
	goals: Goal[],
	dragIndex: number,
	dropIndex: number
) {
	const { id, index: oldIndex } = goals[dragIndex];
	const { index: newIndex, parent_id: newParentId } = goals[dropIndex];
	let updated: Goal[] = [];

	// if an index is null, throw an error
	if (newIndex === null || oldIndex === null) throw new Error('Indices cannot be null.');

	// Update the dragged goal:
	const updatedDragGoal = (await updateGoal(sb, id, newParentId, newIndex)) as Goal;
	updated = [updatedDragGoal];

	if (newIndex < oldIndex) {
		updated = [
			...updated,
			...(await incrementIndices(sb, {
				excludeId: id,
				newParentId: newParentId,
				newIndex: newIndex,
				oldIndex: oldIndex
			}))
		];
	} else if (newIndex > oldIndex) {
		updated = [
			...updated,
			...(await decrementIndices(sb, {
				excludeId: id,
				newParentId: newParentId,
				newIndex: getLevelCount(goals, newParentId),
				oldIndex: oldIndex
			}))
		];
	} else {
		return goals; // No updates to make
	}

	return merge(updated, goals, (a: Goal, b: Goal) => a.id === b.id);
}

/**
 * From https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
 * @param a the array of values to preserve
 * @param b the array of values to overwrite
 * @param predicate optional way to determine equality. Default is full equality
 * @returns merged array with all the new values
 */
function merge(a: Goal[], b: Goal[], predicate = (a: Goal, b: Goal) => a === b) {
	const c = [...a]; // copy to avoid side effects
	// add all items from B to copy C if they're not already present
	b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)));
	return c;
}

function getLevelCount(goals: Goal[], parentId: string | null) {
	return goals.filter((goal) => goal.parent_id === parentId).length - 1;
}

async function updateGoal(
	sb: SupabaseClient,
	id: string,
	newParentId: string | null,
	newIndex: number
) {
	const { data, error } = await sb
		.from('goals')
		.update({
			parent_id: newParentId,
			index: newIndex
		})
		.eq('id', id)
		.select()
		.single();
	if (error) {
		throw new Error('An error occurred while updating goal ' + id);
	}

	return data as Goal;
}

async function decrementIndices(sb: SupabaseClient, params: Params) {
	const { data, error } = await sb.rpc('decrement_goal_indices', {
		exclude_id: params.excludeId,
		new_pid: params.newParentId,
		new_index: params.newIndex,
		old_index: params.oldIndex
	});

	if (error) throw new Error('An error occurred while decrementing the indices');

	return data;
}

async function incrementIndices(sb: SupabaseClient, params: Params) {
	const { data, error } = await sb.rpc('increment_goal_indices', {
		exclude_id: params.excludeId,
		new_pid: params.newParentId,
		new_index: params.newIndex,
		old_index: params.oldIndex
	});

	if (error) throw new Error('An error occurred while incrementing the indices');

	return data;
}
