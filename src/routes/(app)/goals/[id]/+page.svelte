<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	$: goal = data.flatGoals.find((goal) => {
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
