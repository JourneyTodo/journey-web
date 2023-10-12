<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	import { beforeUpdate } from 'svelte';
	import NavItem from './NavItem.svelte';
	import { createIdToParentMap } from '$lib/functions/utils';

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
			<li style="margin-left: {traceLineage(goal.parent_id) * 1.5}rem">
				<NavItem href="/goals/{goal.id}">
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
