<script lang="ts">
	import { onMount } from 'svelte';

	export let placeholder: string = 'Description';
	export let content: string;
	export let header: boolean = false;
	export let focus: boolean = false; // enable autofocus
	export let required: boolean = false;

	let ref: HTMLDivElement;
	let isEmpty = !content;

	$: isEmpty = !content;

	// if autofocus is on, focus element
	onMount(() => {
		if (focus) ref.focus();
	});
</script>

<div class="container">
	<div
		contenteditable="plaintext-only"
		role="textbox"
		aria-readonly="false"
		aria-multiline="true"
		aria-label={placeholder}
		translate="no"
		class="description"
		tabindex="0"
		aria-required={required}
		{...$$restProps}
		bind:this={ref}
		bind:textContent={content}
	>
		<p data-placeholder {placeholder} class:isEmpty class:header>
			<br />
		</p>
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
		div:focus-visible {
			outline: none;
		}
		p {
			margin: 0;
		}
		.isEmpty[data-placeholder]::before {
			opacity: var(--opacity-subtext2);
			pointer-events: none;
			float: inline-start;
			position: absolute;
			content: attr(placeholder);
		}
		max-height: 200px;
		overflow-y: auto;
	}
	.header {
		font-size: var(--text-lg);
		font-weight: bold;
	}
</style>
