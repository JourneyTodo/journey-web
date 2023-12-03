<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import TaskItem from './TaskItem.svelte';

	export let tasks: Task[];
</script>

<div class="archived">
	<div class="header-sm header-container">
		<h2 class="">Recently Archived tasks</h2>
		<form id="restore-all" action="/?/restoreTasks" method="POST" use:enhance>
			<input type="hidden" name="ids" value={tasks.map((t) => t.id)} />
			<input type="hidden" name="user_id" value={tasks[0].user_id} />
			<Button type="submit" variant="secondary" size="small" label="Restore all tasks" />
		</form>
	</div>
	{#each tasks as task}
		<TaskItem {task} />
	{/each}
</div>

<style lang="scss">
	.archived {
		margin-top: var(--spacing-xl);
	}
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h2 {
		font-size: var(--text-md);
		margin: 0;
	}
</style>
