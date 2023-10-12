<script lang="ts">
	import { setTitle } from '$lib/functions/utils.js';

	export let data;

	let { user, goals } = data;
	$: ({ user, goals } = data);
</script>

<svelte:head>
	<title>{setTitle(user.full_name ?? 'User')}</title>
</svelte:head>

{#if user}
	<h1>Welcome, {user.full_name}</h1>
	<p>Email address: {user.email}</p>

	{#if goals && goals.length > 0}
		<h2>Goals</h2>
		<ul>
			{#each goals as goal}
				<li>{goal.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No goals yet.</p>
	{/if}
{/if}
