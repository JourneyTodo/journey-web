<script lang="ts">
	import AddModal from './components/AddModal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';
	import {
		deleteModalIsOpen,
		goalModalIsOpen,
		selectedGoal,
		taskModalIsOpen,
		currentTask,
		currentGoal
	} from '$lib/stores/modals.store';
	import Messages from '$lib/components/Messages.svelte';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { messageHandler as mh } from '$lib/MessageHandler';
	import type { Message } from '$lib/MessageHandler';
	import DeleteModal from './components/DeleteModal.svelte';
	import { editingTask, goals as gStore } from '$lib/stores/globals.store';

	export let data;

	let { user, goals, supabase } = data;
	$: ({ user, goals, supabase } = data);
	$: $gStore = goals;

	const flash = getFlash(page);

	$: if ($flash) {
		mh.push({
			lifespan: 5000,
			value: $flash?.message,
			status: $flash.type
		} as Message);
	}

	// Hotkeys to open modals
	function handleKeydown(event: KeyboardEvent) {
		if ($goalModalIsOpen || $taskModalIsOpen || $editingTask) {
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

<Messages />

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

{#if $deleteModalIsOpen && $currentTask}
	<DeleteModal
		bind:isOpen={$deleteModalIsOpen}
		type="Task"
		user_id={$currentTask.user_id ?? ''}
		id={$currentTask.id}
		name={$currentTask.name ?? ''}
	/>
{:else if $deleteModalIsOpen && $currentGoal}
	<DeleteModal
		bind:isOpen={$deleteModalIsOpen}
		type="Goal"
		user_id={$currentGoal.user_id ?? ''}
		id={$currentGoal.id}
		name={$currentGoal.name ?? ''}
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
		}
	}
	:global(body) {
		background: var(--background-primary);
	}
</style>
