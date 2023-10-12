<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';

	export let isOpen = false;
	export let uid: string;
	export let idx: number;

	let goalName = '';

	function closeModal() {
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!-- hidden values -->

	<!-- Title -->
	<Input
		slot="title"
		id="name"
		label="Goal name"
		name="name"
		variant="ghost"
		form="addGoal"
		required
		autofocus
		bind:value={goalName}
	/>

	<!-- Description -->
	<div slot="content">
		<form id="addGoal" action="/?/addGoal" method="POST" use:enhance={closeModal}>
			<input id="uid" type="hidden" name="uid" value={uid} />
			<input id="idx" type="hidden" name="idx" value={idx} />
			<!-- <label for="description">Description</label>
			<textarea id="description" name="description" /> -->
		</form>
	</div>

	<div slot="footer" class="btn-group">
		<Button type="reset" size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
		<Button
			size="small"
			form="addGoal"
			slot="footer"
			type="submit"
			label="Add"
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
