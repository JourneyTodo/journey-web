<script lang="ts">
	import paths from './paths';

	export let name: string;
	export let focusable: string | number | null | undefined = undefined;
	export let fill: boolean = false;

	$: displayIcon = paths[name];
</script>

<svg
	class="icn {$$props.class}"
	{focusable}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	style={displayIcon.rotate ? `transform: rotate(${displayIcon.rotate}deg)` : ''}
>
	{#each displayIcon.paths as path}
		<path class:fill d={path} stroke="currentColor" />
	{/each}
</svg>

<style lang="scss">
	.icn {
		color: inherit !important;
		width: 24px;
		height: 24px;
		path {
			stroke-width: 1.4;
			&.fill {
				fill: var(--text-primary);
			}
			fill: none;
		}
		overflow: visible;
	}
</style>
