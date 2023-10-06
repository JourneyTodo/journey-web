<script lang="ts">
	import { titleCase } from '$lib/functions/utils';
	import { signIn } from '$lib/constants/routes';
	import Button from './Button.svelte';

	// Hardcoded icon for now since we only support google oauth.
	// TODO: make this dynamic
	import google from '$lib/icons/oauth/google.svg';

	export let provider: string;
</script>

<form method="POST">
	<Button
		outline
		fill
		variant="secondary"
		formaction="{signIn}?/signin&provider={provider.toLowerCase()}"
	>
		<img src={google} alt="Google Icon" />
		<span>Continue with {titleCase(provider)}</span>
	</Button>
</form>

<style lang="scss">
	img {
		pointer-events: none;
	}
</style>
