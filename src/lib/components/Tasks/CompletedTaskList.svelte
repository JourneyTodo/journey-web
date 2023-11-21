<script lang="ts">
	import type { Goal, Task } from '$lib/types/sb';
	import CompletedTaskItem from './CompletedTaskItem.svelte';
	import { findGoal, getDayAndMonth, getDayOfWeek } from '$lib/functions/utils';

	export let tasksByDates: Map<string, Task[]>;
	export let goals: Goal[];
</script>

<div class="container">
	{#each [...tasksByDates] as [k, v]}
		<h2>{getDayAndMonth(k)}<span class="day-of-week">{getDayOfWeek(k)}</span></h2>
		{#each v as task}
			<CompletedTaskItem {task} goal={findGoal(task.goal_id ?? '', goals)} />
		{/each}
	{/each}
</div>

<style lang="scss">
	h2 {
		margin: 0;
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid var(--border-common);
		font-size: var(--text-md);
	}
	.day-of-week {
		padding-inline-start: var(--spacing-xs);
		&::before {
			content: '‧';
			padding-inline-end: var(--spacing-xs);
			opacity: var(--opacity-90);
		}
	}
</style>
