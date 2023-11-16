<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import CompletedTaskItem from './CompletedTaskItem.svelte';

	export let tasks: Task[];
</script>

<div class="container">
	{#each tasks as task}
		<h2>{task.completed_at}</h2>
		<CompletedTaskItem {task} />
	{/each}
</div>
