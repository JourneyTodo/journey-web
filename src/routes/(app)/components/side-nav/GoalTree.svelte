<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let goals: Goal[] = [];
	let idToParent: Map<number, number>;

	beforeUpdate(() => {
		idToParent = createIdToParentMap(goals);
	});

	function traceLineage(parent_id: number | null | undefined, depth = 0) {
		if (parent_id === null || parent_id === undefined) {
			return depth;
		}
		return traceLineage(idToParent.get(parent_id), depth + 1);
	}
</script>

<ul class="goals-list" data-testid="goal-tree">
	{#if idToParent}
		{#each goals as goal}
			<div
				class="container"
				style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
				out:slide={{ duration: 400, easing: quintOut, axis: 'x' }}
			>
				<NavItem href="/goals/{goal.user_goal_id}">
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</div>
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
</style>
