<script lang="ts">
	import { onMount } from 'svelte';

	export let placeholder: string = 'Description';
	export let content: string | null | undefined = undefined;
	export let header: boolean = false;
	export let focus: boolean = false; // enable autofocus
	export let required: boolean = false;

	let ref: HTMLDivElement;

	$: isEmpty = !content;

	// if autofocus is on, focus element
	onMount(() => {
		if (focus) handleFocus();
	});

	// For some reason we have to do this to set focus to end of text
	// https://blog.devgenius.io/how-to-set-the-cursor-position-on-contenteditable-div-with-javascript-1bfe86d5fae4
	function handleFocus() {
		const selection = window.getSelection();
		const range = document.createRange();
		selection?.removeAllRanges();
		range.selectNodeContents(ref);
		range.collapse(false);
		selection?.addRange(range);
		ref.focus();
	}
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
		{required}
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
