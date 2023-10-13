<script lang="ts">
	import AddGoalModal from './components/AddGoalModal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals } = data;
	$: ({ user, goals } = data);

	let goalModalIsOpen = false;
</script>

<div class="container">
	<SideNav {user} {goals} bind:goalModalIsOpen />
	<main>
		<slot />
	</main>
</div>

{#if goalModalIsOpen}
	<AddGoalModal bind:isOpen={goalModalIsOpen} uid={user.id} idx={goals.length} />
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
