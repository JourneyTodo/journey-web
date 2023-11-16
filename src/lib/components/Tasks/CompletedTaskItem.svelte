<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let task: Task;
	let date = new Date(Date.parse(task.completed_at!));
</script>

<div
	class="container"
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
	role="presentation"
>
	<div class="text-container">
		<span class="name">{task.name}</span>
		<p class="completed-time">Completed at {date.toLocaleTimeString()}</p>
	</div>
</div>

<style lang="scss">
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
	}
	.completed-time {
		opacity: var(--opacity-subtext);
	}
</style>
