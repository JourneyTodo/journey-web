<main class="account">
	<div class="form-container flex-center">
		<slot />
	</div>
</main>

<style lang="scss">
	:global(body) {
		background: var(--background-secondary);
	}

	.account {
		max-width: 800px;
		background-color: var(--background-primary);
		display: flex;
		height: 100svh;
		justify-content: center;
		margin: auto;
	}

	.form-container {
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 385px;
		padding: 1rem;
	}
	:global(.sign-in-form) {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	:global(.form-error) {
		color: var(--danger);
		font-size: 0.875rem;
	}
	:global(.form-success) {
		color: var(--success);
		font-size: 0.875rem;
	}
</style>
