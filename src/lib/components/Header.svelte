<script lang="ts">
	import { tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';
	import { cubicOut } from 'svelte/easing';

	export let title = '';
	export let numCompleted = 0;
	export let total = 0;

	$: total > 0 ? percent.set((numCompleted / total) * 100, { delay: 0 }) : '';

	const percent = tweened(0, {
		duration: 800,
		delay: 200,
		easing: cubicOut
	});
</script>

<!-- <div class="temp-container"> -->
<header>
	<div class="content">
		<h1>{title}</h1>
		{#if total}
			<p>{Math.floor($percent)}% complete</p>
		{/if}
	</div>
	<ProgressBar bind:numCompleted bind:total />
</header>

<!-- </div> -->

<style lang="scss">
	header {
		// box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
		background: var(--background-primary);
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 1; // For some reason if we don't specify a z-index, the SVGs in task items show up
		.content {
			margin-bottom: var(--spacing-sm);
			padding: 32px 48px 0 4px;
			align-items: baseline;
		}
		h1,
		p {
			margin: 0;
		}
	}

	.content {
		display: flex;
		gap: var(--spacing-lg);
		p {
			opacity: var(--opacity-subtext);
		}
	}
</style>
