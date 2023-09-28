<script lang="ts">
	import { enhance } from '$app/forms';

	const MIN_PASSWORD_LENGTH = 6;

	export let form;

	let name: string;
	let email: string;
	let password: string;
</script>

<h1>Create an account</h1>
<form action="?/register" method="POST" use:enhance>
	<label for="name">Full name</label>
	<input type="text" name="name" autocomplete="off" required bind:value={name} />
	<label for="email">Email</label>
	<input type="email" name="email" required bind:value={email} />
	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		required
		minlength={MIN_PASSWORD_LENGTH}
		bind:value={password}
	/>
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
	<button>Create account</button>
</form>
