<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';

	export let data;

	$: goal = data.goals.find((goal) => {
		return goal.id.toString() === $page.params['id'];
	});
</script>

<h1>{goal?.name}</h1>
{#if goal?.description}
	<p>{goal?.description}</p>
{/if}
{#if goal?.target_date}
	<p>{goal?.target_date}</p>
{/if}

<form action="?/delete" method="POST">
	<input type="hidden" name="id" value={goal?.id} />
	<input type="hidden" name="uid" value={data.user.id} />
	<Button type="submit" variant="danger">Delete</Button>
</form>
