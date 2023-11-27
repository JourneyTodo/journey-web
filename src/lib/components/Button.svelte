<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
	export let action: 'destructive' | '' = '';
	export let size: 'large' | 'medium' | 'small' | 'xsmall' = 'medium';
	export let outline: boolean = false;
	export let classes: string = '';
	export let fill: boolean = false;
	export let form: string = '';
	export let label: string = '';
	export let disabled: boolean = false;
	export let circle: boolean = false;
</script>

{#if form}
	<div class="input-btn-container">
		<slot name="icon-start" />
		<input
			type="submit"
			{form}
			class="btn flex-center {size} {outline ? 'outline' : ''} {fill
				? 'fill'
				: ''} {variant} {classes} {action} {disabled ? 'disabled' : ''}
      {circle ? 'circle' : ''}"
			class:destructive={action}
			value={label}
		/>
	</div>
{:else}
	<button
		{...$$restProps}
		class="btn flex-center {size} {outline ? 'outline' : ''} {fill
			? 'fill'
			: ''} {variant} {classes} {action} {disabled ? 'disabled' : ''}
      {circle ? 'circle' : ''}"
		on:click
		on:mouseenter
		on:mouseleave
	>
		<slot name="icon-start" />
		{#if label}
			<span>{label}</span>
		{:else}
			<slot />
		{/if}
		<slot name="icon-end" />
	</button>
{/if}

<style lang="scss">
	.fill {
		width: 100%;
		height: 50px !important;
	}
	.btn {
		gap: var(--spacing-sm);
		height: 40px;
		border-radius: var(--br-md);
		border: none;
		font-size: var(--text-md);
		font-family: 'Plus Jakarta Sans', sans-serif;
		background-color: none;
		background: none;
		transition: all 120ms ease;
		font-weight: 500;
		padding: 0 var(--spacing-lg);
		&:focus {
			outline: none;
			box-shadow: var(--focus-shadow-primary);
		}

		&.primary {
			background: var(--primary);
			color: white;
			background-blend-mode: soft-light, normal;
			&:focus {
				box-shadow: var(--focus-shadow-primary);
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
				box-shadow: var(--focus-shadow-primary);
			}
			&:hover {
				cursor: pointer;
				background: #d8d6db; //TODO: unhardcode, figure out how to get programmatically
			}

			&.destructive {
				color: var(--danger-text);
				background: var(--razzleberry-lite);
				&:hover {
					cursor: pointer;
					background: #f9d4df;
				}
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
			&:focus {
				background: var(--gurple-lite);
				box-shadow: var(--focus-shadow-primary);
			}
			&:hover {
				cursor: pointer;
				background: var(--ghost-hover);
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
		opacity: var(--opacity-disabled);
		pointer-events: none;
	}

	.xsmall {
		font-size: var(--text-sm);
		height: 24px !important;
		width: 24px !important;
		border-radius: 2px !important;
	}

	.small {
		height: 32px !important;
		border-radius: var(--br-sm) !important;
		font-size: var(--text-sm);
		gap: var(--spacing-xxs) !important;
	}

	.medium {
		padding: 0 1.25rem;
	}

	.circle {
		border-radius: var(--br-circle) !important;
		&.small {
			width: 32px;
			min-width: 32px;
		}
		&.medium {
			width: 40px;
			height: 40px;
		}
		&.large {
			width: 50px;
			height: 50px;
		}
	}
	.icon-wrapper {
		position: absolute;
	}
	.input-btn-container {
		display: flex;
	}
</style>
