<script lang="ts">
	import type { Goal, Task } from '$lib/types/sb';
	import CompletedTaskItem from './CompletedTaskItem.svelte';
	import { findGoal, getDayAndMonth, getDayOfWeek } from '$lib/functions/utils';

	export let tasksByDates: Map<string, Task[]>;
	export let goals: Goal[];
</script>

<div class="container">
	{#each [...tasksByDates] as [k, v]}
		<h2 class="header-sm border-bot">
			{getDayAndMonth(k)}<span class="day-of-week">{getDayOfWeek(k)}</span>
		</h2>
		{#each v as task}
			<CompletedTaskItem {task} goal={findGoal(task.goal_id ?? '', goals)} />
		{/each}
	{/each}
</div>

<style lang="scss">
	.day-of-week {
		padding-inline-start: var(--spacing-xs);
		&::before {
			content: '‧';
			padding-inline-end: var(--spacing-xs);
			opacity: var(--opacity-90);
		}
	}
</style>
