<script lang="ts">
	import GoalTree from '$lib/components/GoalTree.svelte';
	import { getFirstName } from '$lib/functions/utils.js';

	export let data;

	let { user, goals } = data;
	$: ({ user, goals } = data);
</script>

<nav class="side-nav">
	<div class="nav-items">
		<div class="profile">
			{#if user.avatar_url}
				<img src={user.avatar_url} alt="avatar" />
			{:else}
				<div class="profile-img">
					<span class="initial">{user.full_name ? user.full_name[0] : '?'}</span>
				</div>
			{/if}
			<!-- TODO: change this to a href or button -->
			<span>{user.preferred_name ?? user.full_name}'s Journey</span>
		</div>
	</div>

	{#if goals && goals.length > 0}
		<GoalTree {goals} let:goal>
			<span class="goal-name">{goal.name}</span>
		</GoalTree>
	{/if}
</nav>

<style lang="scss">
	.side-nav {
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 270px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		background: #f5f5f7;
		box-shadow: -4px 0px 8px -4px rgba(17, 13, 38, 0.1) inset;
		font-size: 14px;
	}
	.profile {
		display: flex;
		gap: 0.625rem;
		align-items: center;
		.profile-img {
			width: 24px;
			height: 24px;
			border-radius: 6px;
			background-color: #e7e7eb;
			display: flex;
			justify-content: center;
			align-items: center;
			.initial {
				font-size: 12px;
				font-weight: bold;
			}
		}
	}

	.goal-name {
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		margin-bottom: 0.4rem;
	}
</style>
