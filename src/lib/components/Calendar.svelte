<script lang="ts">
	import { formatDate } from '$lib/functions/utils';
	import { onMount } from 'svelte';

	let defaultDate = new Date();
	export let selectedDate: string | null;
	// $: if (selectedDate) selectedDate = formatDate(new Date(selectedDate!));
	let minDate = formatDate(defaultDate);
	onMount(() => {
		if (selectedDate) {
			selectedDate = formatDate(new Date(selectedDate));
		} else {
			selectedDate = formatDate(new Date(defaultDate));
		}
	});
</script>

<input type="date" min={minDate} bind:value={selectedDate} {...$$restProps} />

<style lang="scss">
	input[type='date'] {
		background-color: transparent;
		height: 2rem;
		max-width: 6.75rem;
		border: none;
		border-radius: var(--br-sm);
		transition: all 120ms ease;
		padding: 0 var(--spacing-sm);
		color: var(--text-primary);
		&:focus {
			box-shadow: var(--focus-shadow-primary);
		}
		&:focus-visible {
			box-shadow: var(--focus-shadow-primary);
			outline: none;
		}
		&:hover {
			background-color: var(--ghost-hover);
			cursor: pointer;
		}
		&::-webkit-calendar-picker-indicator {
			cursor: pointer;
			padding: var(--spacing-xs);
			&:focus-visible {
				outline-color: var(--primary);
				border-radius: var(--br-sm);
			}
		}
	}
</style>
