<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { updateGoalOrder } from './sbHelper';
	import { messageHandler as mh } from '$lib/MessageHandler';
	import { orderChanged } from '$lib/constants/messages';

	export let sb: SupabaseClient;
	export let goals: Goal[] = [];

	let idToParent: Map<string, string>;
	let isDragging: boolean = false;
	let dragIndex: number = -1;
	let dropIndex: number = -1;

	beforeUpdate(() => {
		idToParent = createIdToParentMap(goals);
	});

	function traceLineage(parent_id: string | null | undefined, depth = 0) {
		if (parent_id === null || parent_id === undefined) {
			return depth;
		}
		return traceLineage(idToParent.get(parent_id), depth + 1);
	}

	function handleDragStart(e: DragEvent, i: number) {
		dragIndex = i;
		isDragging = true;
		e.dataTransfer!.effectAllowed = 'move';
		e.dataTransfer!.setData('id', i.toString());
	}

	async function handleDragEnd(e: DragEvent) {
		if (e.dataTransfer?.dropEffect !== 'none') {
			// Make sure indices are valid
			if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
				goals = (await updateGoalOrder(sb, goals, dragIndex, dropIndex)).sort((a, b) =>
					(a.path as number).toString().localeCompare((b.path as number).toString())
				);
				mh.push({
					value: orderChanged,
					lifespan: 5000
				});
			}
		}
		resetDragDrop();
	}

	function handleDrop(e: DragEvent) {
		e.dataTransfer!.dropEffect = 'move';
		e.dataTransfer?.getData('id');
	}

	function handleDragOver(e: DragEvent, i: number) {
		if (dragIndex === -1 || i < 0) {
			return;
		}
		if (goals[i] === null || goals[dragIndex] === null) {
			return;
		}

		if (!isChild(goals[i], goals[dragIndex])) {
			dropIndex = i;
			e.dataTransfer!.dropEffect = 'move';
			e.preventDefault();
		}
	}

	function handleDragEnter(e: DragEvent) {
		e.dataTransfer!.dropEffect = 'move';
	}

	// HELPERS
	/**
	 * Given two goals g1 and g2, determines if g2 is a child based on their paths
	 * @param g1
	 * @param g2
	 * @returns true if g2 is a child, else returns false
	 */
	function isChild(g1: Goal, g2: Goal) {
		const currPath = (g1.path as number).toString();
		const dragPath = (g2.path as number).toString();
		const trimmedPath = currPath.slice(0, dragPath.length);

		return trimmedPath === dragPath;
	}

	function resetDragDrop() {
		dragIndex = -1;
		dropIndex = -1;
		isDragging = false;
		idToParent = createIdToParentMap(goals);
	}
</script>

<ul class="goals-list" data-testid="goal-tree" data-isDragging={isDragging}>
	{#if idToParent}
		{#each goals as goal, i}
			{#if dropIndex < dragIndex && i !== dragIndex && i === dropIndex}
				<li
					class="mock-nav-item"
					style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
					data-border="top"
					on:dragover={(event) => handleDragOver(event, i)}
					on:drop={handleDrop}
					on:dragenter={handleDragEnter}
				>
					<div class="empty-nav-block" in:slide={{ duration: 200, easing: quintOut, axis: 'y' }} />
				</li>
			{/if}
			<li
				id="goal-{i}"
				class="container"
				style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
				draggable="true"
				out:slide={{ duration: 400, easing: quintOut, axis: 'x' }}
				on:dragstart={(event) => handleDragStart(event, i)}
				on:dragend={handleDragEnd}
				on:dragover={(event) => handleDragOver(event, i)}
				on:drop={handleDrop}
				on:dragenter={handleDragEnter}
			>
				<NavItem
					href="/goals/{goal.user_goal_id}"
					style={isDragging ? 'pointer-events: none;' : ''}
				>
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</li>
			{#if dropIndex > dragIndex && dragIndex !== dropIndex && i === dropIndex}
				<li
					data-border="top"
					on:dragover={(event) => handleDragOver(event, i)}
					on:drop={handleDrop}
					on:dragenter={handleDragEnter}
				>
					<div class="empty-nav-block" in:slide={{ duration: 200, easing: quintOut, axis: 'y' }} />
				</li>
			{/if}
		{/each}
	{/if}
</ul>

<style lang="scss">
	ul.goals-list {
		margin: 0;
		list-style: none;
		padding-inline-start: 0;
	}

	.goal-name {
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	[data-border='top'] {
		border-top: 2px solid #4829f8;
	}
	.empty-nav-block {
		background: #ebebef;
		border-radius: var(--br-sm);
		box-sizing: border-box;
		height: 38px;
	}
	#dragEndElement {
		height: 34px;
	}
</style>
