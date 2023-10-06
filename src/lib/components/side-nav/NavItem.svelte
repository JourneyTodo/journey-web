<script lang="ts">
	import { page } from '$app/stores';

	export let text: string | null = null;
	export let href: string;

	$: active = $page.url.pathname === href;
</script>

<li class="nav-item {active ? 'active' : ''}">
	<slot name="icon-left" />

	<a {href}>
		<slot name="text">{text}</slot>
	</a>

	{#if $$slots['icon-right']}
		<div class="icon-right">
			<slot name="icon-right" />
		</div>
	{/if}
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

		box-sizing: border-box;
		padding: 0 0.3125rem;

		a {
			display: flex;
			gap: 0.5rem;
			align-items: center;

			font-size: 14px;
			line-height: 18px;
			color: var(--text-dark);
			text-decoration: none;

			padding: 0.5rem 0.3125rem; // 8px 10px
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
