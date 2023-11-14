<script lang="ts">
	import { tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';
	import { cubicOut } from 'svelte/easing';
	import EllipsisButton from './EllipsisButton.svelte';
	import Button from './Button.svelte';
	import type { Goal } from '$lib/types/sb';
	import DeleteModal from '../../routes/(app)/components/DeleteModal.svelte';
	import Icon from './Icon/Icon.svelte';

	export let title = '';
	export let numCompleted: number | null = null;
	export let total: number | null = null;
	let showModal = false;
	export let goal: Goal | null = null;

	$: total !== null && total > 0 ? percent.set((numCompleted! / total) * 100, { delay: 0 }) : '';

	const percent = tweened(0, {
		duration: 800,
		delay: 200,
		easing: cubicOut
	});
	function handleDelete() {
		showModal = !showModal;
	}
</script>

<!-- <div class="temp-container"> -->
<header>
	<div class="wrapper">
		<div class="content">
			<h1>{title}</h1>
			{#if total}
				<p>{Math.floor($percent)}% complete</p>
			{/if}
		</div>
		{#if goal}
			<div class="menu">
				<EllipsisButton>
					<Button
						slot="items"
						size="small"
						variant="secondary"
						action="destructive"
						fill
						on:click={handleDelete}
					>
						<Icon name="trashcan" slot="icon-start" />
						Delete
					</Button>
				</EllipsisButton>
			</div>
		{/if}
	</div>
	{#if numCompleted !== null && total !== null}
		<ProgressBar bind:numCompleted bind:total />
	{/if}
</header>

{#if showModal && goal}
	<DeleteModal
		bind:isOpen={showModal}
		type="Goal"
		user_id={goal.user_id ?? ''}
		id={goal.id}
		name={goal.name ?? ''}
	/>
{/if}

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
			align-items: baseline;
		}
		h1,
		p {
			margin: 0;
		}
		h1 {
			font-size: var(--text-xl);
		}
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		padding: 32px 0 0 4px;
	}

	.content {
		display: flex;
		gap: var(--spacing-lg);
		p {
			opacity: var(--opacity-subtext);
		}
	}
</style>
