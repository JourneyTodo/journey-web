<script lang="ts">
	let defaultDate = new Date();
	export let selectedDate: string | null = formatMinDate();
	function formatMinDate() {
		return `${defaultDate.toLocaleString('en-us', {
			year: 'numeric'
		})}-${defaultDate.toLocaleString('en-us', { month: '2-digit' })}-${defaultDate.toLocaleString(
			'en-us',
			{ day: '2-digit' }
		)}`;
	}
	$: console.log(selectedDate);
</script>

<input type="date" min={formatMinDate()} bind:value={selectedDate} {...$$restProps} />

<style lang="scss">
	input[type='date'] {
		background-color: transparent;
		height: 2rem;
		width: 6.75rem;
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
