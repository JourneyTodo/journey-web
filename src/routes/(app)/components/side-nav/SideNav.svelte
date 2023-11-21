<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import { goalModalIsOpen, taskModalIsOpen } from '$lib/stores/modals.store';
	import type { Goal, User } from '$lib/types/sb';
	import Button from '../../../../lib/components/Button.svelte';
	import Icon from '../../../../lib/components/Icon/Icon.svelte';
	import GoalTree from './GoalTree.svelte';
	import NavItem from './NavItem.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let sb: SupabaseClient;
	export let user: User;
	export let goals: Goal[] = [];

	function openGoalModal() {
		goalModalIsOpen.set(true);
	}
	function openTaskModal() {
		taskModalIsOpen.set(true);
	}
</script>

<nav class="side-nav">
	<div class="top-cluster">
		<div class="toptop-container">
			<NavItem href="/profile">
				<ProfileIcon slot="icon-left" {user} size="small" />
				<span slot="text">{user.preferred_name ?? user.full_name}'s Journey</span>
				<Icon slot="icon-right" name="chevron-down" />
			</NavItem>
		</div>

		<!-- Add task button -->
		<Button size="small" fill on:click={openTaskModal}>
			<Icon name="plus" slot="icon-start" />
			Add task
		</Button>
	</div>

	<div class="main-cluster">
		<!-- TODO: add today/upcoming/inbox/completed nav items here -->
		<NavItem href="/inbox">
			<span slot="text" class="inbox">Inbox</span>
		</NavItem>
		<NavItem href="/today">
			<span slot="text" class="today">Today</span>
		</NavItem>
		<NavItem href="/upcoming">
			<span slot="text" class="today">Upcoming</span>
		</NavItem>
		<NavItem href="/completed">
			<span slot="text" class="today">Completed</span>
		</NavItem>
	</div>

	<div class="goals-cluster">
		<NavItem href="/goals">
			<span slot="text" class="goals-header bold">Goals</span>
			<Button
				slot="icon-right"
				variant="ghost"
				size="xsmall"
				on:click={openGoalModal}
				aria-label="Add goal"
				style="padding: 0;"
			>
				<!-- <a class="flex-center" href="?addGoal" style="color: var(--text-primary)"> -->
				<Icon name="plus" />
				<!-- </a> -->
			</Button>
		</NavItem>
		{#if goals && goals.length > 0}
			<GoalTree {sb} {goals} />
		{/if}
	</div>
</nav>

<style lang="scss">
	.side-nav {
		box-sizing: border-box;
		height: 100vh;
		bottom: 0;
		width: 270px;
		overflow-x: hidden;
		padding: var(--spacing-lg);
		background: #f5f5f7;
		box-shadow: -4px 0px 8px -4px rgba(17, 13, 38, 0.025) inset;
		font-size: 14px;
		overflow-y: auto;
	}
	.top-cluster {
		width: 100%;
		margin-bottom: var(--spacing-lg);
		// display: flex;
		// flex-direction: column;
		// gap: var(--spacing-lg);
	}

	.main-cluster {
		margin-bottom: calc(var(--spacing-lg) * 2);
	}
	.toptop-container {
		display: flex;
		margin-bottom: var(--spacing-lg);
	}
</style>
