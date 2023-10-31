<script lang="ts">
	import AddModal from './components/AddModal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';
	import { goalModalIsOpen, selectedGoal, taskModalIsOpen } from '$lib/stores/modals.store';

	export let data;

	let { user, goals, supabase } = data;
	$: ({ user, goals, supabase } = data);

	// Hotkeys to open modals
	function handleKeydown(event: KeyboardEvent) {
		if ($goalModalIsOpen || $taskModalIsOpen) {
			return;
		}
		if (event.key === 'g') {
			event.preventDefault();
			selectedGoal.set(null);
			goalModalIsOpen.set(true);
		} else if (event.key === 't') {
			event.preventDefault();
			selectedGoal.set(null);
			taskModalIsOpen.set(true);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
	<SideNav sb={supabase} {user} {goals} />
	<main>
		<slot name="header" />
		<slot />
	</main>
</div>

{#if $goalModalIsOpen}
	<AddModal
		user_id={user.id}
		idx={goals.length}
		{goals}
		type="Goal"
		bind:isOpen={$goalModalIsOpen}
	/>
{:else if $taskModalIsOpen}
	<AddModal
		user_id={user.id}
		idx={goals.length}
		{goals}
		type="Task"
		bind:isOpen={$taskModalIsOpen}
	/>
{/if}

<style lang="scss">
	.container {
		display: flex;
		main {
			flex: 1;
			padding: 0 var(--spacing-main);
			margin: 0 auto;
			background: var(--background-primary);
			max-width: 50rem; // 800px;
			max-height: 100svh;
			overflow-y: auto;
		}
	}
	:global(body) {
		background: var(--background-primary);
	}
</style>
