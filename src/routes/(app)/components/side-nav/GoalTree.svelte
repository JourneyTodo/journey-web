<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate, onMount } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let sb: SupabaseClient;
	export let goals: Goal[] = [];

	let idToParent: Map<string, string>;
	let isDragging: boolean = false;
	let isDragEnd: boolean = false;
	let dragIndex: number;
	let dropIndex: number;
	let dragEndElement: HTMLDivElement;

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

		e.dataTransfer!.dropEffect = 'move';
		e.dataTransfer?.setData('text/html', e.currentTarget!.getAttribute('id'));
		e.dataTransfer?.setData('text/uri-list', e.currentTarget!.getAttribute('id'));
	}

	async function handleDragEnd(e: DragEvent) {
		if (isDragEnd) {
			// Do the things
			const { id: drag_id } = goals[dragIndex];
			const rootCount = goals.filter((goal) => goal.parent_id === null).length - 1;
			console.log(rootCount);

			const { data: goal, error } = await sb
				.from('goals')
				.update({
					parent_id: null,
					index: rootCount
				})
				.eq('id', drag_id)
				.select();
			const { data: res, error: err } = await sb.rpc('decrement_goal_indices', {
				new_id: drag_id,
				new_pid: null,
				new_index: rootCount
			});
			const { data, error: er } = await sb
				.from('goals')
				.select()
				.eq('user_id', 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57')
				.order('path');
			if (data !== null) goals = data;
		} else if (dragIndex !== dropIndex) {
			// update indexes
			const { id: drag_id } = goals[dragIndex];
			const { index: new_index, parent_id } = goals[dropIndex];

			if (new_index === null) return;

			// reflect changes on db side
			const { data: goal, error } = await sb
				.from('goals')
				.update({
					parent_id,
					index: new_index
				})
				.eq('id', drag_id)
				.select();
			const { data: res, error: err } = await sb.rpc('update_goal_indices', {
				new_id: drag_id,
				new_pid: parent_id,
				new_index
			});
			const { data, error: er } = await sb
				.from('goals')
				.select()
				.eq('user_id', 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57')
				.order('path');
			if (data !== null) goals = data;
		}

		// reset
		dragIndex = -1;
		dropIndex = -1;
		isDragging = false;
		isDragEnd = false;
		idToParent = createIdToParentMap(goals);
	}

	function handleDragDrop(e: DragEvent) {
		e.preventDefault();
	}

	function handleDragOver(e: DragEvent, i: number) {
		dropIndex = i;
		isDragEnd = false;
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}

	function handleDragOverEnd(e: DragEvent) {
		isDragEnd = true;
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}
</script>

<ul class="goals-list" data-testid="goal-tree" data-isDragging={isDragging}>
	{#if idToParent}
		{#each goals as goal, i}
			{#if !isDragEnd && i !== dragIndex && i === dropIndex}
				<li
					style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
					data-border={i === 0 ? 'bottom' : 'top'}
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
				on:dragstart={() => handleDragStart(event, i)}
				on:dragend={handleDragEnd}
				on:dragover={() => handleDragOver(event, i)}
				on:drop={handleDragDrop}
			>
				<NavItem
					href="/goals/{goal.user_goal_id}"
					style={isDragging ? 'pointer-events: none;' : ''}
				>
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</li>
		{/each}
		<div
			role="presentation"
			id="dragEndElement"
			bind:this={dragEndElement}
			on:dragover={handleDragOverEnd}
			on:dragend={handleDragEnd}
			on:drop={handleDragDrop}
		>
			{#if isDragEnd}
				<li data-border="top">
					<div class="empty-nav-block" in:slide={{ duration: 200, easing: quintOut, axis: 'y' }} />
				</li>
			{/if}
		</div>
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
	[data-border='bottom'] {
		border-bottom: 2px solid #4829f8;
	}
	.empty-nav-block {
		background: #ebebef;
		border-radius: var(--br-sm);
		box-sizing: border-box;
		height: 38px;
	}

	[data-isDragging='true'] {
		.nav-item:hover,
		.nav-item.active {
			background: inherit !important;
		}
	}

	#dragEndElement {
		height: 34px;
	}
</style>
