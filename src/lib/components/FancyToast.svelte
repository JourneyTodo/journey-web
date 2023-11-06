<!-- For more fancy toast content -->
<script lang="ts">
	import Button from './Button.svelte';

	export let text: string;
	export let buttonLabel: string;
	export let url: string | null = null;
	export let location: string | null = null;
</script>

{#if url && location}
	<span class="value">
		{text} to <a href={url}>{location}</a>
	</span>
{:else}
	<span class="value">{text}</span>
{/if}
<Button
	size="small"
	variant="ghost"
	style="padding: var(--spacing-sm); width: auto !important; color: var(--more-powerful-purple) !important;"
	on:click
>
	{buttonLabel}
</Button>
