<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import type { Goal } from '$lib/types/sb';

	export let isOpen = false;
	export let user_id: string;
	export let idx: number;
	export let type: 'Goal' | 'Task' = 'Goal';
	export let goals: Goal[] = [];

	let name = '';
	let formId = `add${type}`;
	let selectedGoal: Goal | null = null;

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
			<input id="goal_id" type="hidden" name="goal_id" value={selectedGoal?.id ?? null} />
			<!-- <label for="description">Description</label>
			<textarea id="description" name="description" /> -->
		</form>
	</div>

	<div slot="footer" class="btn-group">
		<div class="group-start">
			<Dropdown label="Goal" items={goals} propLabel="name" bind:selected={selectedGoal} />
		</div>

		<div class="group-end">
			<Button type="reset" size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
			<Button
				size="small"
				form="add{type}"
				slot="footer"
				type="submit"
				label="Add {type.toLocaleLowerCase()}"
				on:click={closeModal}
			/>
		</div>
		<!-- TOOD: add disabled={!goalName} once you get reactive binding working from child to parent -->
	</div>
</Modal>

<style lang="scss">
	.btn-group {
		display: flex;
		justify-content: space-between;

		.group-end {
			display: flex;
			justify-content: flex-end;
			gap: var(--spacing-sm);
		}
	}
</style>
