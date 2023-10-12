<script lang="ts">
	import { page } from '$app/stores';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let text: string | null = null;
	export let href: string;

	$: active = $page.url.pathname === href;
</script>

<!-- TODO: add this back once you figure out  -->
<div
	{...$$restProps}
	class="nav-item {active ? 'active' : ''}"
	in:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
>
	<slot name="icon-left" />

	<a {href}>
		<slot name="text">{text}</slot>
	</a>

	{#if $$slots['icon-right']}
		<div class="icon-right flex-center">
			<slot name="icon-right" />
		</div>
	{/if}
</div>

<style lang="scss">
	.nav-item {
		display: flex;
		gap: 0.625rem;
		align-items: center;

		list-style: none;
		width: 100%;
		border-radius: var(--br-sm);
		cursor: pointer;

		box-sizing: border-box;
		padding: 0 calc(var(--spacing-md) / 2);

		a {
			display: flex;
			gap: var(--spacing-sm);
			align-items: center;

			font-size: var(--text-sm);
			line-height: 18px;
			color: var(--text-primary);
			text-decoration: none;

			padding: var(--spacing-sm) calc(var(--spacing-md) / 2);
			width: 100%;
		}

		&:hover,
		&.active {
			background: #ebebef;
		}

		.icon-right {
			margin-left: auto;
		}
	}
</style>
