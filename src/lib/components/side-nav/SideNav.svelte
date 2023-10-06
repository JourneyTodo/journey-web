<script lang="ts">
	import ChevronDown from '$lib/components/ChevronDown.svelte';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import type { Goal, User } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import GoalTree from './GoalTree.svelte';
	import NavItem from './NavItem.svelte';

	export let user: User;
	export let goals: Goal[] = [];
</script>

<nav class="side-nav">
	<NavItem href="/profile">
		<ProfileIcon slot="icon-left" {user} size="small" />
		<span slot="text">{user.preferred_name ?? user.full_name}'s Journey</span>
		<i slot="icon-right" class="icon-right">
			<ChevronDown />
		</i>
	</NavItem>

	<!-- <div class="nav-block"> -->
	<!-- TODO: add today/upcoming/inbox/completed nav items here -->
	<!-- </div> -->

	{#if goals && goals.length > 0}
		<div class="goals-container">
			<NavItem href="/goals">
				<span slot="text" class="goals-header bold">Goals</span>
				<Button slot="icon-right" variant="ghost" size="xsmall">
					<a href="?addGoal">
						<i class="icon-right">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="11"
								viewBox="0 0 10 11"
								fill="none"
							>
								<path d="M5 0.5V10.5M10 5.5H0" stroke="#3A3455" stroke-width="1.4" />
							</svg>
						</i>
					</a>
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
		box-shadow: -4px 0px 8px -4px rgba(17, 13, 38, 0.1) inset;
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
