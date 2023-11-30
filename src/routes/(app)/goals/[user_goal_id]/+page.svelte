<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import TaskList from '$lib/components/Tasks/TaskList.svelte';
	import { currentTasks } from '$lib/stores/modals.store.js';

	export let data;
	let { tasks, goal } = data;
	let numCompleted: number = 0;
	let total: number = tasks?.length ?? 0;
	$: ({ tasks, goal } = data),
		(numCompleted = tasks!.filter((t) => {
			return t.completed;
		}).length),
		(total = tasks?.length ?? 0);
	$: currentTasks.set(tasks ?? []);
	// TODO: uncomment this when you have time to fix the dropdown to include buckets
	// selectedGoal.set(goal);
</script>

<div class="section">
	<Header title={goal?.name} bind:numCompleted bind:total {goal} />
	{#if tasks}
		<div class="tasklist-container">
			<TaskList {tasks} {goal} />
		</div>
	{/if}
</div>

<style lang="scss">
	.section {
		display: flex;
		flex-direction: column;
		&:not(:first-of-type) {
			margin-top: var(--spacing-xl);
		}
	}

	.tasklist-container {
		margin-top: var(--spacing-md);
	}
</style>
