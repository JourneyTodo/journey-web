<script lang="ts" generics="T">
	import Button from './Button.svelte';
	import Icon from './Icon/Icon.svelte';
	import Listbox from './Listbox.svelte';

	export let label: string;
	export let items: T[] = [];
	export let selected: T | null = null;

	/**
	 * The property of the item to use as the label. If null, the item itself will be used.
	 * @default null
	 */
	export let propLabel: keyof T | null = null;

	let showListbox = false;

	function toggleListbox() {
		showListbox = !showListbox;
	}

	function handleClickOut(e: MouseEvent) {
		// if showListBox is false, let the click pass through
		if (!showListbox) return;

		// If the click is outside the listbox, close it
		if (!(e.target as HTMLElement).closest('#dropdown')) {
			showListbox = false;
		}
	}
</script>

<svelte:window on:click={handleClickOut} />

<div class="container" id="dropdown">
	<Button
		variant="ghost"
		size="small"
		on:click={toggleListbox}
		style="padding:0 var(--spacing-sm) !important;"
	>
		<span class="label">
			{#if selected}
				{#if propLabel}
					{selected[propLabel]}
				{:else}
					{selected}
				{/if}
			{:else}
				{label}
			{/if}
		</span>
		<div class="icn-container">
			<Icon slot="icon-end" name="chevron-down" />
		</div>
	</Button>
	{#if showListbox}
		<div class="listbox-wrapper">
			<Listbox id="listbox" {items} {propLabel} bind:selected bind:isOpen={showListbox} />
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: inline-block;
	}
	.listbox-wrapper {
		position: absolute;
		z-index: 4;
	}

	.label {
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	// Some hacks to bypass the viewbox. Not optimal, but it works and I'm trying to move fast
	.icn-container {
		width: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding-inline-start: var(--spacing-xs);
	}
</style>
