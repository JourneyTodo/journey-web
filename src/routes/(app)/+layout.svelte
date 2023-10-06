<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import SideNav from '$lib/components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals, addGoal } = data;
	$: ({ user, goals, addGoal } = data);
</script>

<div class="container">
	<SideNav {user} {goals} />
	<main>
		<slot />
	</main>
</div>

{#if addGoal}
	<Modal isOpen={true} title="Add goal">
		<form slot="content" action="?/addGoal" method="POST">
			<!-- hidden values -->
			<input id="uid" type="hidden" name="uid" value={user.id} />
			<input id="idx" type="hidden" name="idx" value={5} />

			<Input id="name" label="Goal name" name="name" required />
			<label for="description">Description</label>
			<textarea id="description" name="description" />
			<Button slot="footer" type="submit">Add</Button>
		</form>
		<div slot="footer" class="btn-group">
			<Button slot="footer" variant="secondary" outline>Cancel</Button>
		</div>
	</Modal>
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
		gap: 10px;
	}
</style>
