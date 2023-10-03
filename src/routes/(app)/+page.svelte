<script lang="ts">
	import { setTitle } from '$lib/functions/utils.js';

	// get supabase user info
	export let data;

	let { user } = data;
	$: ({ user } = data);
</script>

<svelte:head>
	<title>{setTitle(user.full_name ?? 'User')}</title>
</svelte:head>

{#if user}
	<h1>Welcome, {user.full_name}</h1>
	<p>Email address: {user.email}</p>
{/if}
