<script lang="ts">
	import { PROVIDERS } from '$lib/constants/providers';
	import OauthProvider from '$lib/components/OauthProvider.svelte';
</script>

<slot />
{#each PROVIDERS as provider}
	<OauthProvider {provider} />
{/each}
