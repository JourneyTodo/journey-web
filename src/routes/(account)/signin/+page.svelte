<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import SignInLayout from '../SignInLayout.svelte';

	const header = 'Great to see you again.';

	export let form;

	let email: string;
	let password: string;
</script>

<SignInLayout formType="signin" {header}>
	<form slot="form" action="?/signin" method="POST" class="sign-in-form" use:enhance>
		<Input label="Email" type="email" id="email" name="email" required bind:value={email} />
		<Input
			label="Password"
			type="password"
			id="password"
			name="password"
			required
			bind:value={password}
		/>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<button type="submit"> Sign in </button>
	</form>
</SignInLayout>
