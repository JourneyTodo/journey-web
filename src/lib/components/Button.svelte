<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
	export let size: 'large' | 'medium' | 'small' | 'xsmall' = 'medium';
	export let outline: boolean = false;
	export let classes: string = '';
	export let fill: boolean = false;
	export let form: string = '';
	export let label: string = '';
	export let disabled: boolean = false;
</script>

{#if form}
	<input
		type="submit"
		{form}
		class="btn flex-center {size} {outline ? 'outline' : ''} {fill
			? 'fill'
			: ''} {variant} {classes} {disabled ? 'disabled' : ''}"
		value={label}
	/>
{:else}
	<button
		{...$$restProps}
		class="btn flex-center {size} {outline ? 'outline' : ''} {fill
			? 'fill'
			: ''} {variant} {classes} {disabled ? 'disabled' : ''}"
		on:click
	>
		<slot name="icon" />
		{#if label}
			<span>{label}</span>
		{:else}
			<slot />
		{/if}
	</button>
{/if}

<style lang="scss">
	.fill {
		width: 100%;
		height: 50px !important;
	}
	.btn {
		gap: var(--spacing-xs);
		height: 40px;
		border-radius: var(--br-md);
		border: none;
		font-size: 16px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		background-color: none;
		background: none;
		transition: all 120ms ease;
		font-weight: 500;
		padding: 0 1.25rem;
		&:focus {
			outline: none;
			box-shadow: 0px 0px 0px 5px rgba(129, 102, 255, 0.25);
		}

		&.primary {
			background: var(--primary);
			color: white;
			background-blend-mode: soft-light, normal;
			&:focus {
				box-shadow: 0px 0px 0px 1px #fff, 0px 0px 0px 5px rgba(129, 102, 255, 0.25) !important;
			}
			&:hover {
				cursor: pointer;
				// background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), var(--primary);
				background: #5f41f9; //TODO: unhardcode, figure out how to get programmatically
			}
		}
		&.secondary {
			background: var(--secondary);

			&:focus {
				box-shadow: 0px 0px 0px 1px #fff, 0px 0px 0px 5px rgba(129, 102, 255, 0.25) !important;
			}
			&:hover {
				cursor: pointer;
				background: #d8d6db; //TODO: unhardcode, figure out how to get programmatically
			}
		}

		&.danger {
			background: var(--danger);
			color: white;
			background-blend-mode: soft-light, normal;
			&:focus {
				box-shadow: 0px 0px 0px 1px #fff, 0px 0px 0px 5px rgba(255, 0, 0, 0.25) !important;
			}
			&:hover {
				cursor: pointer;
				background: #db134b; //TODO: unhardcode, figure out how to get programmatically
			}
		}
		&.ghost {
			background: none;
			border-radius: var(--br-circle);
			height: 40px;
			width: 40px;
			padding: 0 !important; // this is overrides browser css like safari
			&:focus {
				box-shadow: 0px 0px 0px 1px #fff, 0px 0px 0px 5px rgba(129, 102, 255, 0.25) !important;
			}
			&:hover {
				cursor: pointer;
				background-color: color-mix(in srgb, var(--btn-secondary-outline) 20%, transparent);
				// background: color-mix(in srgb, var(--primary) 20%, transparent);
			}
		}
	}
	.outline {
		background: transparent !important;
		&:focus {
			border: 1px solid var(--primary) !important;
		}
		&.primary {
			border: 1px solid var(--primary);
			color: var(--primary);
		}
		&.secondary {
			border: 1px solid var(--btn-secondary-outline);
			color: var(--text-primary);
		}
		&:hover {
			cursor: pointer;
			background-color: color-mix(in srgb, var(--btn-secondary-outline) 20%, transparent);
		}
	}

	.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.xsmall {
		height: 24px !important;
		width: 24px !important;
		border-radius: 2px !important;
	}

	.small {
		height: 32px !important;
		border-radius: var(--br-sm) !important;
		font-size: var(--text-sm);
	}
</style>
