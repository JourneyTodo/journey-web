<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import SignInLayout from '../SignInLayout.svelte';

	const MIN_PASSWORD_LENGTH = 6;
	const header = 'Create an account to begin your Journey today.';

	export let form;

	let name: string;
	let email: string;
	let password: string;
</script>

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
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		<button>Create account</button>
	</form>
</SignInLayout>
