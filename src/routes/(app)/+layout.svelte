<script lang="ts">
	import AddModal from './components/AddModal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals } = data;
	$: ({ user, goals } = data);

	let goalModalIsOpen = false;
	let taskModalIsOpen = false;

	// Hotkeys to open modals
	function handleKeydown(event: KeyboardEvent) {
		if (goalModalIsOpen || taskModalIsOpen) {
			return;
		}
		event.preventDefault();
		if (event.key === 'g') {
			goalModalIsOpen = true;
		} else if (event.key === 't') {
			taskModalIsOpen = true;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
	<SideNav {user} {goals} bind:goalModalIsOpen bind:taskModalIsOpen />
	<main>
		<slot />
	</main>
</div>

{#if goalModalIsOpen}
	<AddModal bind:isOpen={goalModalIsOpen} user_id={user.id} idx={goals.length} type="Goal" />
{:else if taskModalIsOpen}
	<AddModal bind:isOpen={taskModalIsOpen} user_id={user.id} idx={goals.length} type="Task" />
{/if}

<style lang="scss">
	.container {
		display: flex;
		main {
			flex: 1;
			margin: 2.5rem;
			background: var(--background-primary);
		}
	}
	:global(body) {
		background: var(--background-primary);
	}
</style>
