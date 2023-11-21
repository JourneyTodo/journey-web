<script lang="ts">
	import type { Goal, Task } from '$lib/types/sb';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import CompleteBox from './CompleteBox.svelte';

	export let task: Task;
	export let goal: Goal | undefined;
	let date = new Date(Date.parse(task.completed_at!));

	$: goalName = goal ? goal.name : 'Inbox';
</script>

<div
	class="container"
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
	role="presentation"
>
	<CompleteBox {task} />
	<div class="text-container">
		<div class="span-container">
			<span class="name">{task.name}</span>
			<span class="goal">{goalName}</span>
		</div>
		<p class="completed-time">
			Completed at {date.toLocaleTimeString('en-us', { timeStyle: 'short' })}
		</p>
	</div>
</div>

<style lang="scss">
	p {
		margin: 0;
	}
	.container {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid var(--border-common);
	}
	.text-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		width: 100%;
	}
	.span-container {
		display: flex;
		justify-content: space-between;
	}
	.completed-time {
		opacity: var(--opacity-subtext);
		font-size: var(--text-xs);
	}
</style>
