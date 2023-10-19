<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let goals: Goal[] = [];
	let idToParent: Map<string, string>;

	let dragIndex: number;
	let dropIndex: number;

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
		console.log('dragstart');

		dragIndex = i;

		e.dataTransfer!.dropEffect = 'move';
		e.dataTransfer?.setData('text/html', e.currentTarget!.getAttribute('id'));
		e.dataTransfer?.setData('text/uri-list', e.currentTarget!.getAttribute('id'));
	}

	function handleDragEnd(e: DragEvent) {
		console.log('dragend');
		const temp = goals[dropIndex];
		goals[dropIndex] = goals[dragIndex];
		goals[dragIndex] = temp;
		dragIndex = -1;
		dropIndex = -1;
		idToParent = createIdToParentMap(goals);
	}

	function handleDragDrop(e: DragEvent) {
		console.log('drop');
		e.preventDefault();
	}

	function handleDragOver(e: DragEvent, i: number) {
		console.log('dragging over ', goals[i].name);
		dropIndex = i;
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}
</script>

<ul class="goals-list" data-testid="goal-tree">
	{#if idToParent}
		{#each goals as goal, i}
			<li
				id="goal-{i}"
				class="container"
				style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
				draggable="true"
				out:slide={{ duration: 400, easing: quintOut, axis: 'x' }}
				on:dragstart={() => handleDragStart(event, i)}
				on:dragend={handleDragEnd}
				on:dragover={() => handleDragOver(event, i)}
				on:drop={handleDragDrop}
			>
				<NavItem href="/goals/{goal.user_goal_id}">
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</li>
			{#if i === dropIndex}
				<li
					class="container drop-zone"
					style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
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

	.drop-zone {
		border-top: 2px solid black;
	}
	.empty-nav-block {
		background: #ebebef;
		border-radius: var(--br-sm);
		box-sizing: border-box;
		height: 38px;
	}
</style>
