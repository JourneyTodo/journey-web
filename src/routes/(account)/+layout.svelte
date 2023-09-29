<main class="account">
	<div class="form-container">
		<slot />
	</div>
</main>

<style lang="scss">
	:global(body) {
		background: #f3f2f5;
	}

	.account {
		max-width: 756px;
		background-color: #fcfcfc;
		display: flex;
		height: 100vh;
		justify-content: center;
		margin: auto;
		// box-shadow: 8px 0px 16px 0px rgba(10, 5, 37, 0.05), 0px 0px 4px 0px rgba(10, 5, 37, 0.04);
	}

	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
		max-width: 385px;
		padding: 1rem;
	}
	:global(.sign-in-form) {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
