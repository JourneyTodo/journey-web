<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';

	export let data;

	$: goal = data.goals.find((goal) => {
		return goal.user_goal_id.toString() === $page.params['user_goal_id'];
	});
</script>

<h1>{goal?.name}</h1>
{#if goal?.description}
	<p>{goal?.description}</p>
{/if}
{#if goal?.target_date}
	<p>{goal?.target_date}</p>
{/if}

<form action="?/delete" method="POST" use:enhance>
	<input type="hidden" name="id" value={goal?.id} />
	<input type="hidden" name="user_id" value={data.user.id} />
	{#if goal?.parent_id === null}
		<input type="hidden" name="isParent" value="hi mom and dad!" />
	{/if}
	<Button type="submit" variant="danger">Delete</Button>
</form>
