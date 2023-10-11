<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import { listToTree } from '$lib/functions/mapping';
	import type { Goal, User } from '$lib/types/sb';
	import Button from '../../../../lib/components/Button.svelte';
	import Icon from '../../../../lib/components/Icon/Icon.svelte';
	import GoalTree from './GoalTree.svelte';
	import NavItem from './NavItem.svelte';

	export let user: User;
	export let goals: Goal[] = [];

	$: goals = listToTree(goals);
</script>

<nav class="side-nav">
	<NavItem href="/profile">
		<ProfileIcon slot="icon-left" {user} size="small" />
		<span slot="text" style="line-height: 30px;"
			>{user.preferred_name ?? user.full_name}'s Journey</span
		>
		<Icon slot="icon-right" name="chevron-down" />
	</NavItem>

	<!-- Add task button -->
	<Button size="small" disabled>
		<Icon name="plus" slot="icon" />
		Add task
	</Button>

	<!-- <div class="nav-block"> -->
	<!-- TODO: add today/upcoming/inbox/completed nav items here -->
	<!-- </div> -->

	{#if goals && goals.length > 0}
		<div class="goals-container">
			<NavItem href="/goals">
				<span slot="text" class="goals-header bold">Goals</span>
				<Button slot="icon-right" variant="ghost" size="xsmall">
					<!-- <a class="flex-center" href="?addGoal" style="color: var(--text-primary)"> -->
					<Icon name="plus" />
					<!-- </a> -->
				</Button>
			</NavItem>
			<GoalTree {goals} let:goal>
				<NavItem href="/goals/{goal.id}">
					<span slot="text" class="goal-name">{goal.name}</span>
				</NavItem>
			</GoalTree>
		</div>
	{/if}
</nav>

<style lang="scss">
	.side-nav {
		box-sizing: border-box;
		height: 100vh;
		bottom: 0;
		width: 270px;
		padding: 1rem;
		display: flex;
		gap: 2rem;
		flex-direction: column;
		background: #f5f5f7;
		box-shadow: -4px 0px 8px -4px rgba(17, 13, 38, 0.025) inset;
		font-size: 14px;
	}

	:global(.goals-container > ul) {
		padding-inline-start: 0 !important;
		color: red;
	}

	.goal-name {
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
