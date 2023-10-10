<script lang="ts">
	import Button from './Button.svelte';

	export let isOpen = false;
	export let title = '';
	export let content = '';
</script>

<div class="modal-overlay flex-center" class:open={isOpen}>
	<dialog class="modal">
		<header class="modal-header">
			<slot name="title">
				<h2>{title}</h2>
			</slot>
			<Button variant="ghost" size="medium">
				<!-- TODO: Add x icon during icon refactor + cleanup -->
				X
			</Button>
		</header>
		<div class="modal-content">
			<slot name="content">
				<p>{content}</p>
			</slot>
		</div>
		<footer class="modal-footer">
			<slot name="footer">
				<Button variant="secondary" outline>Close</Button>
			</slot>
		</footer>
	</dialog>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background-color: #110d2633;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease-in-out;
		&.open {
			opacity: 1;
			pointer-events: all;
		}
	}

	.modal {
		box-sizing: border-box;
		margin: auto;
		width: 100%;
		max-width: 28.5rem;
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: var(--br-md);
		background: #fcfcfc;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
		padding: 2rem;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h2 {
			font-size: 1.25rem;
			font-weight: 600;
			margin: 0;
		}
	}

	.modal-content {
		flex: 1;
		margin: 1.5rem 0;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
