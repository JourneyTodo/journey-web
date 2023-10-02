<script lang="ts">
	import Eye from '$lib/icons/eye.svelte';
	import Button from './Button.svelte';

	export let label: string;
	export let id: string;

	let showPassword = false;

	function togglePassword() {
		showPassword = !showPassword;
		$$restProps.type = showPassword ? 'text' : 'password';
	}
</script>

<div class="container">
	<input {id} placeholder=" " required {...$$restProps} />
	<label for={id}>{label}</label>
	{#if $$restProps.type === 'password' || showPassword}
		<i class="icon">
			<Button style="ghost" type="button" aria-label="show password" on:click={togglePassword}>
				<Eye open={showPassword} />
			</Button>
		</i>
	{/if}
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
			padding: 1rem 0.875rem 0 0;
			text-indent: 0.875rem;
			background: transparent;
		}
		input:focus {
			outline: none;
			border: 1px solid var(--power-purple);
			box-shadow: 0px 0px 0px 5px rgba(129, 102, 255, 0.25);
		}
		input:focus ~ label,
		input:valid ~ label,
		input:not(:placeholder-shown):invalid ~ label,
		input:-webkit-autofill ~ label {
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

	.icon {
		position: absolute;
		right: 0.875rem;
		top: 50%;
		transform: translate(7px, -50%);
	}
</style>
