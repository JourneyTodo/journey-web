<script lang="ts">
	import type { Goal, Task } from '$lib/types/sb';
	import AddTask from './AddTask.svelte';
	import TaskItem from './TaskItem.svelte';

	export let tasks: Task[];
	export let goal: Goal | null;
</script>

<div class="container">
	{#each tasks as task}
		<TaskItem {task} />
	{/each}
	<AddTask {goal} />
</div>
