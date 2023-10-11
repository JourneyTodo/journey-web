<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import SideNav from './components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals, addGoal } = data;
	$: ({ user, goals, addGoal } = data);

	function closeModal() {
		addGoal = false;
	}
</script>

<div class="container">
	<SideNav {user} {goals} />
	<main>
		<slot />
	</main>
</div>

{#if addGoal}
	<form id="addGoal" action="?/addGoal" method="POST" use:enhance>
		<Modal bind:isOpen={addGoal}>
			<!-- hidden values -->
			<input id="uid" type="hidden" name="uid" value={user.id} />
			<input id="idx" type="hidden" name="idx" value={5} />

			<!-- Title -->
			<Input
				slot="title"
				id="name"
				label="Goal name"
				name="name"
				variant="ghost"
				required
				autofocus
			/>

			<!-- Description -->
			<div slot="content">
				<label for="description">Description</label>
				<textarea id="description" name="description" />
			</div>

			<div slot="footer" class="btn-group">
				<Button size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
				<Button size="small" form="addGoal" slot="footer" type="submit" label="Add" />
			</div>
		</Modal>
	</form>
{/if}

<style lang="scss">
	.container {
		display: flex;
		main {
			flex: 1;
			margin: 2.5rem;
		}
	}

	.btn-group {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-sm);
	}
</style>
