<script lang="ts">
	import type { Goal, Task } from '$lib/types/sb';
	import AddTask from './AddTask.svelte';
	import ArchivedTaskList from './ArchivedTaskList.svelte';
	import TaskItem from './TaskItem.svelte';

	export let tasks: Task[] = [];
	export let archivedTasks: Task[] | undefined;
	export let goal: Goal | null;
	export let showCompleted = false;
</script>

<div class="container">
	{#each tasks as task}
		{#if !task.completed && !showCompleted}
			<TaskItem {task} />
		{:else if showCompleted}
			<TaskItem {task} />
		{/if}
	{/each}
	<AddTask {goal} />
	{#if archivedTasks && archivedTasks.length > 0}
		<ArchivedTaskList tasks={archivedTasks} />
	{/if}
</div>
