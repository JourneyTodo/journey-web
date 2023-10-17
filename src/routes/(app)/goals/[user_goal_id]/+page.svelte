<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';

	export let data;
	let { tasks, goal, user } = data;
	$: ({ tasks, goal, user } = data);
</script>

<h1>{goal?.name}</h1>
{#if goal?.description}
	<p>{goal?.description}</p>
{/if}
{#if goal?.target_date}
	<p>{goal?.target_date}</p>
{/if}
{#if tasks}
	{#each tasks as task}
		<p>{task.name}</p>
		<form action="?/deleteTask" method="POST" use:enhance>
			<!-- Hidden -->
			<input type="hidden" name="id" value={task.id} />
			<input type="hidden" name="user_id" value={user.id} />
			<Button type="submit" variant="danger">Delete Task</Button>
		</form>
	{/each}
{/if}

<form action="?/deleteGoal" method="POST" use:enhance>
	<input type="hidden" name="id" value={goal?.id} />
	<input type="hidden" name="user_id" value={data.user.id} />
	{#if goal?.parent_id === null}
		<input type="hidden" name="isParent" value="hi mom and dad!" />
	{/if}
	<Button type="submit" variant="danger">Delete Goal</Button>
</form>
