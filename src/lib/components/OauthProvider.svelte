<script lang="ts">
	import { titleCase } from '$lib/functions/titleCase';
	import { signIn } from '$lib/constants/routes';
	import Button from './Button.svelte';
	export let provider: string;
</script>

<form method="POST">
	<Button style="secondary" outline formaction="{signIn}?/signin&provider={provider.toLowerCase()}">
		<span>Continue with {titleCase(provider)}</span>
	</Button>
</form>
