<script lang="ts">
	import { tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';
	import { cubicOut } from 'svelte/easing';
	import type { Goal, Task } from '$lib/types/sb';
	import GoalMenu from './GoalMenu.svelte';
	import { currentTasks } from '$lib/stores/modals.store';
	import { getDayAndMonth, isTodayOrTomorrow } from '$lib/functions/utils';

	export let title = '';
	export let numCompleted: number | null = null;
	export let total: number | null = null;
	export let goal: Goal | null = null;
	let targetDate: string | null = null;

	$: total !== null && total > 0 ? percent.set((numCompleted! / total) * 100, { delay: 0 }) : '';
	const percent = tweened(0, {
		duration: 800,
		delay: 200,
		easing: cubicOut
	});
	$: targetDate = goal ? goal.target_date ?? getLatestTargetDate() : null;

	function getLatestTargetDate() {
		const defaultTime = '01 Jan 1970 00:00:00 GMT';
		const sortedByLatestDate = [...$currentTasks].sort(
			(a: Task, b: Task) =>
				Date.parse(b.target_date ?? defaultTime) - Date.parse(a.target_date ?? defaultTime)
		);
		return sortedByLatestDate.length > 0 ? sortedByLatestDate[0].target_date : null;
	}
</script>

<!-- <div class="temp-container"> -->
<header>
	<div class="wrapper">
		<div class="content">
			<h1>{title}</h1>
			{#if total}
				<span>{Math.floor($percent)}% complete</span>
				<span>{total} {total > 1 ? 'tasks' : 'task'}</span>
			{/if}
			{#if targetDate}
				<span>{isTodayOrTomorrow(targetDate) ?? getDayAndMonth(targetDate)}</span>
			{/if}
		</div>
		{#if goal}
			<div class="menu">
				<GoalMenu bind:goal />
			</div>
		{/if}
	</div>
	{#if numCompleted !== null && total !== null}
		<ProgressBar bind:numCompleted bind:total />
	{/if}
</header>

<style lang="scss">
	header {
		// box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
		background: var(--background-primary);
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 1; // For some reason if we don't specify a z-index, the SVGs in task items show up
		.content {
			margin-bottom: var(--spacing-sm);
			align-items: baseline;
		}
		h1,
		span {
			margin: 0;
		}
		h1 {
			font-size: var(--text-xl);
		}
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		padding-top: var(--spacing-xxl);
	}

	.content {
		display: flex;
		gap: var(--spacing-lg);
		span {
			opacity: var(--opacity-subtext);
		}
	}
</style>
