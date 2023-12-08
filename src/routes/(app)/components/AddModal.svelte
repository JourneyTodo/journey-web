<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import type { Goal } from '$lib/types/sb';
	import { currentDate, selectedGoal } from '$lib/stores/modals.store';
	import DescriptionBox from '$lib/components/DescriptionBox.svelte';
	import Calendar from '$lib/components/Calendar.svelte';

	export let isOpen = false;
	export let user_id: string;
	export let idx: number;
	export let type: 'Goal' | 'Task' = 'Goal';
	export let goals: Goal[] = [];

	let name: string;
	let description: string;
	let formId = `add${type}`;
	let selectedDate: string;

	function closeModal() {
		isOpen = false;
		selectedGoal.set(null);
	}

	$: selectedDate = $currentDate ?? '';
</script>

<Modal bind:isOpen>
	<DescriptionBox
		slot="title"
		id="name"
		label="{type} name"
		placeholder="{type} name"
		name="name"
		form={formId}
		header
		focus
		required
		bind:content={name}
	/>

	<!-- Description -->
	<div slot="content">
		<form id={formId} action="/?/{formId}" method="POST" use:enhance={closeModal}>
			<!-- hidden values -->
			<input id="user_id" type="hidden" name="user_id" value={user_id} />
			<input id="name" type="hidden" name="name" value={name} />
			<input id="description" type="hidden" name="description" value={description} />
			<input id="idx" type="hidden" name="idx" value={idx} />
			<input id="goal_id" type="hidden" name="goal_id" value={$selectedGoal?.id ?? null} />
			<input
				id="user_goal_id"
				type="hidden"
				name="user_goal_id"
				value={$selectedGoal?.user_goal_id ?? null}
			/>
			<!-- TODO: fall back to buckets once those are set up fully -->
			<input id="goal_name" type="hidden" name="goal_name" value={$selectedGoal?.name ?? 'Inbox'} />
		</form>
		<DescriptionBox id="description" name="description" bind:content={description} />
	</div>

	<div slot="footer" class="btn-group">
		<div class="group-start">
			<Dropdown label="Goal" items={goals} propLabel="name" bind:selected={$selectedGoal} />
			<Calendar form={formId} id="target_date" name="target_date" bind:value={selectedDate} />
		</div>

		<div class="group-end">
			<Button type="reset" size="small" variant="secondary" on:click={closeModal}>Cancel</Button>
			<Button
				size="small"
				form={formId}
				slot="footer"
				type="submit"
				label="Add {type.toLocaleLowerCase()}"
				disabled={!name}
				on:click={closeModal}
			/>
		</div>
	</div>
</Modal>

<style lang="scss">
	.btn-group {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-xs);
	}
</style>
