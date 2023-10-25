<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TaskItem from '$lib/components/Tasks/TaskItem.svelte';

	export let data;
	let { tasks, goal } = data;
	$: ({ tasks, goal } = data);
</script>

<div class="temp-container">
	<h1>{goal?.name}</h1>
	<form action="?/deleteGoal" method="POST" use:enhance>
		<input type="hidden" name="id" value={goal?.id} />
		<input type="hidden" name="user_id" value={data.user.id} />
		{#if goal?.parent_id === null}
			<input type="hidden" name="isParent" value="hi mom and dad!" />
		{/if}
		<Button type="submit" variant="danger">Delete Goal</Button>
	</form>
</div>
{#if goal?.description}
	<p>{goal?.description}</p>
{/if}
{#if goal?.target_date}
	<p>{goal?.target_date}</p>
{/if}
{#if tasks}
	{#each tasks as task}
		<TaskItem {task} />
	{/each}
{/if}

<style lang="scss">
	.temp-container {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
</style>
