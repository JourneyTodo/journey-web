<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string | null = null;
	export let href: string;
	let active: boolean = false;

	onMount(() => {
		active = window.location.pathname === href;
	});
</script>

<li class="nav-item {active ? 'active' : ''}">
	<a {href}>
		<slot name="icon-left" />

		<slot name="text">{text}</slot>

		{#if $$slots['icon-right']}
			<div class="icon-right">
				<slot name="icon-right" />
			</div>
		{/if}
	</a>
</li>

<style lang="scss">
	.nav-item {
		display: flex;
		gap: 0.625rem;
		align-items: center;

		list-style: none;
		width: 100%;
		border-radius: 4px;
		cursor: pointer;

		a {
			display: flex;
			gap: 0.5rem;
			align-items: center;

			font-size: 14px;
			line-height: 16px;
			color: var(--text-dark);
			text-decoration: none;

			padding: 0.5rem 0.625rem; // 8px 10px
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
