<script lang="ts">
	import OauthProvider from '$lib/components/OauthProvider.svelte';
	import BannerLogo from '$lib/components/BannerLogo.svelte';
	import { PROVIDERS } from '$lib/constants/providers';

	export let header: string;
	export let formType: 'signin' | 'register';
</script>

<div class="container">
	<header>
		<div class="logo-wrapper">
			<BannerLogo width={200} />
		</div>
		{#if header}
			<h1 class="header">{header}</h1>
		{/if}
	</header>

	<div class="form-wrapper">
		<slot name="form" />
	</div>

	<div class="oauth-container">
		{#if PROVIDERS.length > 0}
			<span class="separator">Or</span>
			{#each PROVIDERS as provider}
				<OauthProvider {provider} />
			{/each}
		{/if}
	</div>

	<footer>
		{#if formType === 'register'}
			<span>Already have an account? <a href="/signin">Sign in</a></span>
		{:else if formType === 'signin'}
			<span>Don't have an account yet? <a href="/register">Create one</a></span>
		{/if}
	</footer>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		align-items: stretch;
		text-align: center;
	}
	.form-wrapper {
		margin-top: 1.5rem;
	}
	.separator {
		display: flex;
		align-items: center;
		text-align: center;
		width: 100%;
		gap: 0.5rem;
		opacity: 0.6;
		margin: 0;
		margin-bottom: 1rem;

		&::before,
		&::after {
			content: '';
			flex: 1;
			border-bottom: 1px solid var(--text-dark);
		}
	}

	.header {
		margin: 0;
		margin-top: 10px;
		font-size: 20px;
		font-weight: 500;
	}

	:global(.form-btn) {
		margin-top: 10px !important;
	}
</style>
