<script lang="ts" generics="T">
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let items: T[] = [];
	export let selected: T | null = null;
	export let position: 'top' | 'bottom' = 'bottom';
	export let isOpen = true;
	export let propLabel: keyof T | null = null;

	let list: HTMLUListElement;

	function handleItemClick(item: T) {
		isOpen = false;
		selected = item;
	}

	function handleKeyPress(e: KeyboardEvent, i: number) {
		if (e.key === 'Enter') {
			isOpen = false;
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (i !== list.children.length - 1) {
				const item = list.children[i + 1].firstChild as HTMLElement;
				item.focus();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (i !== 0) {
				const item = list.children[i - 1].firstChild as HTMLElement;
				item.focus();
			}
		}
	}

	function handleHover(i: number) {
		list.children[i].firstChild?.focus();
	}
</script>

<div
	{...$$restProps}
	class="box {position}"
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
>
	<ul class="list" bind:this={list}>
		{#each items as item, i}
			<li id="listBox-items">
				<div
					id={i.toString()}
					class="clickable {item === selected ? 'selected' : ''}"
					role="button"
					tabindex="0"
					on:click={() => handleItemClick(item)}
					on:keydown={() => handleKeyPress(event, i)}
					on:mouseenter={() => handleHover(i)}
				>
					<div class="content">
						{#if propLabel}
							{item[propLabel]}
						{:else}
							{item}
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.box {
		border: 1px solid #d4d3dca1;
		background: white;
		border-radius: var(--br-md);
		max-height: 11.325rem;
		max-width: 18.75rem;
		min-width: 14rem;
		overflow-x: hidden;
		overflow-y: auto;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
		font-size: var(--text-sm);
		padding: var(--spacing-sm);
		.clickable {
			border-radius: var(--br-sm);
			padding: calc(var(--spacing-md) - 3px) 0;
			&:focus-visible {
				outline: none;
			}
		}
		ul:hover > li > div.clickable:focus-visible {
			background: none;
			cursor: default;
		}
		ul:hover > li > div.clickable:hover,
		li > div.clickable:focus-visible {
			background-color: var(--gurple-lite);
			cursor: pointer;
		}
		.content {
			margin: 0 var(--spacing-md);
			word-wrap: break-word;
			word-break: break-all;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}
	.selected {
		background-color: var(--gurple-lite);
	}
	.top {
		margin-bottom: var(--spacing-xs);
	}
	.bottom {
		margin-top: var(--spacing-xs);
	}
</style>
