<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import { slide } from 'svelte/transition';
	import CompleteBox from './CompleteBox.svelte';
	import { quintOut } from 'svelte/easing';

	export let task: Task;
	$: ({ name, description, completed } = task);
</script>

<div
	class="container"
	class:completed
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
>
	{#if completed !== null}
		<CompleteBox bind:task />
	{/if}
	<div class="text-container">
		<span class="name">{name}</span>
		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid var(--border-common);
	}
	.text-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.description {
		font-size: var(--text-xs);
		margin: 0;
		opacity: var(--opacity-subtext);
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		// TODO: update this to use line-clamp & flexbox when browsers support it
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.completed {
		.description,
		.name {
			transition: all 200ms ease-out;
			opacity: var(--opacity-50);
			text-decoration: line-through;
		}
	}
</style>
