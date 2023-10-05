<script lang="ts">
	export let style: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let outline: boolean = false;
	export let classes: string = '';
</script>

<button {...$$restProps} class="btn {outline ? 'outline' : ''} {style} {classes}" on:click>
	<slot name="icon" />
	<slot />
</button>

<style lang="scss">
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 50px;
		width: 100%;
		border-radius: 7px;
		border: none;
		font-size: 16px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		background-color: none;
		background: none;
		transition: all 200ms ease;
		font-weight: 500;
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
				background: #5435f9; //TODO: unhardcode, figure out how to get programmatically
			}
		}
		&.ghost {
			background: none;
			border-radius: 100%;
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
		background-color: transparent;
		&:focus {
			border: 1px solid var(--primary) !important;
		}
		&.primary {
			border: 1px solid var(--primary);
			color: var(--primary);
		}
		&.secondary {
			border: 1px solid var(--btn-secondary-outline);
			color: var(--text-dark);
		}
		&:hover {
			cursor: pointer;
			background-color: color-mix(in srgb, var(--btn-secondary-outline) 20%, transparent);
		}
	}
</style>
