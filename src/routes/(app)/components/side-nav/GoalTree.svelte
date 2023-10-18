<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let goals: Goal[] = [];
	let idToParent: Map<string, string>;

	beforeUpdate(() => {
		idToParent = createIdToParentMap(goals);
		goals.sort((a, b) => {
			if (a.parent_id === b.id) {
				return 1;
			}
			// if b is a child of a, b should come after a
			if (b.parent_id === a.id) {
				return -1;
			}
			// otherwise, skip
			return 0;
		});
	});

	function traceLineage(parent_id: string | null | undefined, depth = 0) {
		if (parent_id === null || parent_id === undefined) {
			return depth;
		}
		return traceLineage(idToParent.get(parent_id), depth + 1);
	}
</script>

<ul class="goals-list" data-testid="goal-tree">
	{#if idToParent}
		{#each goals as goal}
			<li
				class="container"
				style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem"
				out:slide={{ duration: 400, easing: quintOut, axis: 'x' }}
			>
				<NavItem href="/goals/{goal.user_goal_id}">
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</li>
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
