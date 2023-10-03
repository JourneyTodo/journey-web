<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { setTitle } from '$lib/functions/utils';
	import SignInLayout from '../SignInLayout.svelte';

	const header = 'Great to see you again.';

	export let form;

	let email: string;
	let password: string;

	if (form?.error) {
		email = form?.email ?? '';
	}
</script>

<svelte:head>
	<title>{setTitle('Sign in')}</title>
</svelte:head>

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
			<span class="form-error">{form.error}</span>
		{/if}

		<Button type="submit" classes="form-btn" data-testid="signin-btn">Sign in</Button>
	</form>
</SignInLayout>
