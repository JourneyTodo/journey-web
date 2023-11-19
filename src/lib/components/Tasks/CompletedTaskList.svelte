<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import CompletedTaskItem from './CompletedTaskItem.svelte';

	export let tasksByDates: Map<string, Task[]>;
	/**
	 * TasksByDay: {
	 *  date: number,
	 *  tasks: Task[]
	 * }
	 *
	 */

	function getDayAndMonth(dateStr: string) {
		const date = new Date(Date.parse(dateStr));
		const month = date.toLocaleString('en-us', { month: 'long' });
		const day = date.getDate();
		return `${month} ${day}`;
	}
	function getDayOfWeek(dateStr: string) {
		const date = new Date(Date.parse(dateStr));
		const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });
		return `${dayOfWeek}`;
	}
</script>

<div class="container">
	{#each [...tasksByDates] as [k, v]}
		<h2>{getDayAndMonth(k)}<span class="day-of-week">{getDayOfWeek(k)}</span></h2>
		{#each v as task}
			<CompletedTaskItem {task} />
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
