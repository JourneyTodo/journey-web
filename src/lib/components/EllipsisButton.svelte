<script lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon/Icon.svelte';
	import Listbox from './Listbox.svelte';

	export let showMore = false;

	let element: HTMLDivElement;
	let listBox: HTMLElement;

	function toggleMenu() {
		showMore = !showMore;
	}
	function handleClickOut(e: MouseEvent) {
		if (!showMore) return;

		// If the click is outside the menu/listbox, close it
		const target = e.target as HTMLElement;
		if (target === listBox || target === element) return;
		if (element.contains(target) || listBox.contains(target)) return;

		showMore = false;
	}
</script>

<svelte:window on:click={handleClickOut} />

<div class="container" id="menu" bind:this={element}>
	<Button
		variant="ghost"
		size="xsmall"
		style="padding: 0; margin-inline-start: auto;"
		on:click={toggleMenu}
	>
		<Icon slot="icon-start" name="ellipsis" />
	</Button>
</div>
{#if showMore}
	<div class="listbox-wrapper" bind:this={listBox}>
		<Listbox bind:isOpen={showMore}>
			<slot name="items" />
		</Listbox>
	</div>
{/if}

<style lang="scss">
	.listbox-wrapper {
		position: absolute;
		z-index: 4;
		transform: translateX(-75%);
	}
</style>
