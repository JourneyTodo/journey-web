<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let numCompleted = 0;
	export let total = 0;
	export let size: 'small' | 'default' = 'default';

	$: setProgress(numCompleted, total, 0);

	onMount(() => {
		setProgress(numCompleted, total);
	});

	function setProgress(numCompleted: number, total: number, delay: number = 0) {
		if (total === 0) {
			progress.set(0, {
				delay: delay,
				duration: 400
			});
			return;
		}
		progress.set(numCompleted / total, { delay: delay });
	}

	const progress = tweened(0, {
		duration: 1100,
		delay: 400,
		easing: cubicOut
	});
</script>

<div class="bar-container {size}">
	<div class="filled-bar" style="width: {$progress * 100}%" />
</div>

<style lang="scss">
	.bar-container {
		width: 100%;
		background: #b3b2b8;
		height: 4px;
		overflow: hidden;
		border-radius: 0.0625rem;
	}
	.filled-bar {
		height: inherit;
	}
	.filled-bar {
		border-radius: 0.025rem;
		border-radius: 0.025rem;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0) 87.5%),
			#6747ff;
		box-shadow: 0px 0px 14px 0px rgba(176, 159, 255, 0.3), 0px 0px 4px -1px rgba(103, 71, 255, 0.6);
	}

	.small {
		height: 2px;
	}
</style>
