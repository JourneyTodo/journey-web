<script lang="ts">
	export let label: string;
</script>

<div class="container">
	<input required {...$$restProps} />
	<label for="input">{label}</label>
</div>

<style lang="scss">
	.container {
		position: relative;
		input {
			box-sizing: border-box;
			height: 3.5rem;
			border-radius: 7px;
			border: 1px solid var(--primitive-outline);
			font-size: 1rem;
			width: 100%;
			padding: 1rem 0.875rem 0rem;
		}
		input:focus {
			outline: none;
			border: 1px solid var(--power-purple);
			box-shadow: 0px 0px 0px 4px rgba(129, 102, 255, 0.25);
		}
		input:focus ~ label,
		input:valid ~ label {
			font-size: 12px;
			opacity: 0.75;
			top: 0.5rem;
		}
		label {
			position: absolute;
			pointer-events: none;
			top: 30%;
			left: 0.875rem;
		}
		label,
		input {
			transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
		}
	}
</style>
