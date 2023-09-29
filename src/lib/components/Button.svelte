<script lang="ts">
	export let style: 'primary' | 'secondary' = 'primary';
	export let outline: boolean = false;
</script>

<button {...$$restProps} class="btn {outline ? 'outline' : ''} {style}">
	<slot name="icon" />
	<slot />
</button>

<style lang="scss">
	.btn {
		height: 50px;
		width: 100%;
		border-radius: 7px;
		border: none;
		font-size: 16px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		background-color: none;
		background: none;
		transition: all 200ms ease;

		&.primary {
			background: var(--power-purple);
			color: white;
			background-blend-mode: soft-light, normal;
			&:hover {
				cursor: pointer;
				// background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), var(--power-purple);
				background: #5435f9; //TODO: unhardcode, figure out how to get programmatically
			}
		}
	}
	.outline {
		background-color: transparent;
		&.primary {
			border: 1px solid var(--power-purple);
			color: var(--power-purple);
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
