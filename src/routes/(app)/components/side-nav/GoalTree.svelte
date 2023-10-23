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
	let dragIndex: number = -1;
	let dropIndex: number = -1;
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
		e.dataTransfer!.effectAllowed = 'move';

		e.dataTransfer!.setData('id', i.toString());
	}

	async function handleDragEnd(e: DragEvent) {
		if (e.dataTransfer?.dropEffect !== 'none') {
			if (dragIndex !== dropIndex && dragIndex !== -1 && dropIndex !== -1) {
				// update indexes
				const { id: drag_id, index: old_index } = goals[dragIndex];
				const { index: new_index, parent_id } = goals[dropIndex];

				if (new_index === null || old_index === null) return;

				// reflect changes on db side
				const { data: goal, error } = await sb
					.from('goals')
					.update({
						parent_id,
						index: new_index
					})
					.eq('id', drag_id)
					.select();

				// TODO: move this to an AFTER UPDATE trigger so we don't have to make a 2nd req
				// TODO: return the updated goals and do a diff
				// TODO: Don't allow parent to be a child to prevent circular relationship
				if (new_index > old_index) {
					const rootCount = goals.filter((goal) => goal.parent_id === null).length - 1;
					const { data: res, error: err } = await sb.rpc('decrement_goal_indices', {
						new_id: drag_id,
						new_pid: null,
						new_index: rootCount,
						old_index
					});
				} else if (new_index < old_index) {
					const { data: res, error: err } = await sb.rpc('update_goal_indices', {
						new_id: drag_id,
						new_pid: parent_id,
						new_index,
						old_index
					});
				} else {
					console.log(dropIndex, new_index);
					// reset
					dragIndex = -1;
					dropIndex = -1;
					isDragging = false;
					isDragEnd = false;
					return;
				}
				// TODO: remove
				const { data, error: er } = await sb
					.from('goals')
					.select()
					.eq('user_id', 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57')
					.order('path');
				if (data !== null) goals = data;
			}
		}

		// reset
		dragIndex = -1;
		dropIndex = -1;
		isDragging = false;
		isDragEnd = false;
		idToParent = createIdToParentMap(goals);
	}

	function handleDrop(e: DragEvent) {
		e.dataTransfer!.dropEffect = 'move';
		e.dataTransfer?.getData('id');
	}

	function handleDragOver(e: DragEvent, i: number) {
		console.log(goals[i].name);
		if (dragIndex === -1 || i < 0) {
			return;
		}
		if (goals[i] === null || goals[dragIndex] === null) {
			return;
		}

		// With these, we can make sure drag over element is not a child
		const currPath = (goals[i].path as number).toString();
		const dragPath = (goals[dragIndex].path as number).toString();
		const trimmedPath = currPath.slice(0, dragPath.length);

		if (trimmedPath !== dragPath) {
			dropIndex = i;
			isDragEnd = false;
			e.dataTransfer!.dropEffect = 'move';
			e.preventDefault();
		}
	}

	function handleDragOverEnd(e: DragEvent) {
		if (dropIndex !== -1) {
			isDragEnd = true;
			e.dataTransfer!.dropEffect = 'move';
		}
		e.preventDefault();
	}

	function handleDragEnter(e: DragEvent) {
		e.dataTransfer!.dropEffect = 'move';
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<ul class="goals-list" data-testid="goal-tree" data-isDragging={isDragging}>
	{#if idToParent}
		{#each goals as goal, i}
			{#if !isDragEnd && i !== dragIndex && i === dropIndex}
				<li
					class="mock-nav-item"
					style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
					data-border={i === 0 ? 'bottom' : 'top'}
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
		{/each}
		<div
			role="presentation"
			id="dragEndElement"
			bind:this={dragEndElement}
			on:dragover={handleDragOverEnd}
			on:drop={handleDrop}
		>
			{#if isDragEnd && dragIndex !== dropIndex}
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
	#dragEndElement {
		height: 34px;
	}
</style>
