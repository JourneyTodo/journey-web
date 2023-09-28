<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	let email: string;
	let password: string;
</script>

<h1>Sign in</h1>
<form action="?/signin" method="POST" use:enhance>
	<label for="email">Email</label>
	<input type="email" id="email" name="email" required bind:value={email} />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" required bind:value={password} />

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit"> Sign in </button>
	<div>Don't have an account? <a href="/register">Create one</a></div>
</form>
