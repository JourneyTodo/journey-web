<script lang="ts">
	export let placeholder: string = 'Description';
	export let outline: boolean = false;
	export let value: string = '';

	let textArea: HTMLTextAreaElement;
</script>

<div class="grow-wrapper" data-replicated-value=" ">
	<textarea
		class="description"
		class:outline
		{placeholder}
		bind:this={textArea}
		bind:value
		onInput="this.parentNode.dataset.replicatedValue = this.value"
		{...$$restProps}
	/>
</div>

<style lang="scss">
	.description {
		resize: none;
		height: 100%;
		width: 100%;
		font-size: var(--spacing-sm);
		border: none;
		padding: 0;
		&.outline {
			border: 1px solid var(--border-common);
		}
		&:focus-visible {
			outline: none;
		}
	}

	.grow-wrapper {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
		max-height: 19rem; //304px
		overflow-y: auto;
	}
	.grow-wrapper::after {
		/* Note the weird space! Needed to prevent jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	.grow-wrapper > textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	.grow-wrapper > textarea,
	.grow-wrapper::after {
		/* Identical styling required!! */
		font: inherit;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}
</style>
