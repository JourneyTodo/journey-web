<script lang="ts">
	import { titleCase } from '$lib/functions/titleCase';
	import { signIn } from '$lib/constants/routes';
	export let provider: string;
</script>

<form method="POST">
	<button formaction="{signIn}?/signin&provider={provider.toLowerCase()}"
		>Continue with {titleCase(provider)}</button
	>
</form>
