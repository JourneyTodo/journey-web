<script>
	import { draw } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	export let completed = false;
	export let duration = 180;
</script>

<svg
	width="20"
	height="20"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class:completed
>
	{#if completed}
		<path d="M6 9.75L9 12.5L15 7" transition:draw={{ duration, easing: circOut, delay: 100 }} />
	{:else}
		<path d="M6 9.75L9 12.5L15 7" />
	{/if}
</svg>

<style lang="scss">
	svg {
		opacity: 0;
		transition: opacity 100ms ease-in-out;
		&:hover {
			opacity: 0.6;
		}
	}
	path {
		stroke: var(--moody-purple);
	}
	.completed {
		opacity: 0.9;
		pointer-events: none;
	}
</style>
