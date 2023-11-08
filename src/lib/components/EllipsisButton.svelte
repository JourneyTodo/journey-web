<script lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon/Icon.svelte';
	import Listbox from './Listbox.svelte';

	let showMore = false;
	function showMoreMenu() {
		showMore = true;
	}
</script>

<Button
	variant="ghost"
	size="xsmall"
	style="padding: 0; margin-inline-start: auto;"
	on:click={showMoreMenu}
>
	<Icon slot="icon-start" name="ellipsis" />
</Button>
{#if showMore}
	<div class="listbox-wrapper">
		<Listbox>
			<Button size="small" variant="secondary">Delete</Button>
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
