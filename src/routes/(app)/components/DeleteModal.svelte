<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import { currentTask } from '$lib/stores/modals.store';

	export let isOpen = false;
	export let user_id: string;
	export let id: string;
	export let type: 'Goal' | 'Task' = 'Goal';
	export let name: string;

	let formId = `delete${type}`;

	function closeModal() {
		isOpen = false;
		currentTask.set(null);
	}
</script>

<Modal bind:isOpen>
	<!-- Description -->
	<div slot="content">
		<form id={formId} action="/?/{formId}" method="POST" use:enhance={closeModal}>
			<!-- hidden values -->
			<input id="user_id" type="hidden" name="user_id" value={user_id} />
			<input id="id" type="hidden" name="id" value={id} />
		</form>
		<p>Are you sure you want to delete {type.toLocaleLowerCase()} <strong>{name}</strong>?</p>
	</div>

	<div slot="footer" class="group-end">
		<Button type="reset" size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
		<Button
			size="small"
			variant="secondary"
			action="destructive"
			type="submit"
			slot="footer"
			form="delete{type}"
			label="Delete {type.toLocaleLowerCase()}"
			on:click={closeModal}>Delete</Button
		>
	</div>
</Modal>

<style>
	p {
		margin: 0;
		line-height: 100%;
		min-width: 28rem;
		padding-bottom: 1.5rem;
	}
</style>
