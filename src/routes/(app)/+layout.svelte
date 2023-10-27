<script lang="ts">
	import AddModal from './components/AddModal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals, supabase } = data;
	$: ({ user, goals, supabase } = data);

	export let taskModalIsOpen = false;
	let goalModalIsOpen = false;

	// Hotkeys to open modals
	function handleKeydown(event: KeyboardEvent) {
		if (goalModalIsOpen || taskModalIsOpen) {
			return;
		}
		if (event.key === 'g') {
			event.preventDefault();
			goalModalIsOpen = true;
		} else if (event.key === 't') {
			event.preventDefault();
			taskModalIsOpen = true;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
	<SideNav sb={supabase} {user} {goals} bind:goalModalIsOpen bind:taskModalIsOpen />
	<main>
		<slot name="header" />
		<slot />
	</main>
</div>

{#if goalModalIsOpen}
	<AddModal
		bind:isOpen={goalModalIsOpen}
		user_id={user.id}
		idx={goals.length}
		{goals}
		type="Goal"
	/>
{:else if taskModalIsOpen}
	<AddModal
		bind:isOpen={taskModalIsOpen}
		user_id={user.id}
		idx={goals.length}
		{goals}
		type="Task"
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
