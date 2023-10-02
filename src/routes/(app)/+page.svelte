<script lang="ts">
	// get supabase user info
	export let data;

	let { user } = data;
	$: ({ user } = data);
</script>

{#if user}
	<h1>Welcome, {user.full_name}</h1>
	<p>Email address: {user.email}</p>
{/if}
