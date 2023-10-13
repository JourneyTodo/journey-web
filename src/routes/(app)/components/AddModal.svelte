<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';

	export let isOpen = false;
	export let user_id: string;
	export let idx: number;
	export let type: 'Goal' | 'Task' = 'Goal';

	let name = '';
	let formId = `add${type}`;

	function closeModal() {
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!-- Title -->
	<Input
		slot="title"
		id="name"
		label="{type} name"
		name="name"
		variant="ghost"
		form="add{type}"
		required
		autofocus
		bind:value={name}
	/>

	<!-- Description -->
	<div slot="content">
		<form id={formId} action="/?/{formId}" method="POST" use:enhance={closeModal}>
			<!-- hidden values -->
			<input id="user_id" type="hidden" name="user_id" value={user_id} />
			<input id="idx" type="hidden" name="idx" value={idx} />
			<!-- <label for="description">Description</label>
			<textarea id="description" name="description" /> -->
		</form>
	</div>

	<div slot="footer" class="btn-group">
		<Button type="reset" size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
		<Button
			size="small"
			form="add{type}"
			slot="footer"
			type="submit"
			label="Add {type.toLocaleLowerCase()}"
			on:click={closeModal}
		/>
		<!-- TOOD: add disabled={!goalName} once you get reactive binding working from child to parent -->
	</div>
</Modal>

<style lang="scss">
	.btn-group {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-sm);
	}
</style>