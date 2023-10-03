<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { setTitle } from '$lib/functions/utils';
	import SignInLayout from '../SignInLayout.svelte';

	const MIN_PASSWORD_LENGTH = 6;
	const header = 'Create an account to get started.';

	export let form;

	let name: string;
	let email: string;
	let password: string;

	if (form?.error) {
		email = form?.email.toString() ?? '';
		name = form?.name.toString() ?? '';
	}
</script>

<svelte:head>
	<title>{setTitle('Create account')}</title>
</svelte:head>

<SignInLayout formType="register" {header}>
	<form slot="form" action="?/register" method="POST" class="sign-in-form" use:enhance>
		<Input label="Full name" type="text" id="name" name="name" required bind:value={name} />
		<Input label="Email" type="email" id="email" name="email" required bind:value={email} />
		<Input
			label="Password"
			type="password"
			id="password"
			name="password"
			required
			minlength={MIN_PASSWORD_LENGTH}
			bind:value={password}
		/>
		<Button data-testid="register-btn">Create account</Button>
		{#if form?.error}
			<span class="form-error">{form.error}</span>
		{:else if form?.success}
			<span class="form-success">Check your email to verify your account.</span>
		{/if}
	</form>
</SignInLayout>
