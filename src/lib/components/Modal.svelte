<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Button from './Button.svelte';
	import Icon from './Icon/Icon.svelte';

	export let isOpen = false;
	export let title = '';
	export let content = '';

	function close() {
		isOpen = false;
	}
	function escape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
		}
	}
</script>

<div
	role="presentation"
	class="modal-overlay flex-center"
	transition:fade={{ duration: 100 }}
	on:click|self={close}
	on:keyup={escape}
>
	<dialog class="modal" transition:scale={{ duration: 200 }}>
		<header class="modal-header">
			<slot name="title">
				<h2>{title}</h2>
				<Button variant="ghost" size="medium" on:click={close}>
					<Icon name="close" />
				</Button>
			</slot>
		</header>
		<div class="modal-content">
			<slot name="content">
				{content}
			</slot>
		</div>
		<footer class="modal-footer">
			<slot name="footer">
				<Button variant="secondary" outline on:click={close}>Close</Button>
			</slot>
		</footer>
	</dialog>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
		opacity: 1;
	}

	.modal {
		top: 20svh;
		box-sizing: border-box;
		margin: auto;
		width: 100%;
		max-width: 34.5rem;
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: var(--br-md);
		background: white;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
		padding: var(--spacing-lg);
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
		margin: var(--spacing-md) 0;
	}
</style>
