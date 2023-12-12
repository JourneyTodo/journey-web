<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import Calendar from '../Calendar.svelte';
	import DescriptionBox from '../DescriptionBox.svelte';
	import Dropdown from '../Dropdown.svelte';
	import { selectedGoal } from '$lib/stores/modals.store';
	import { goals } from '$lib/stores/globals.store';

	export let task: Task;
	export let isEdit = false;
	let formId = `edit-${task.id}`;
	$: selectedGoal.set($goals?.find((g) => g.id === task.goal_id) ?? null);

	function cancel() {
		isEdit = false;
	}
</script>

<form id={formId} class="container">
	<DescriptionBox id="name" header label="Task name" focus required bind:content={task.name} />
	<DescriptionBox id="description" name="description" bind:content={task.description} />
	<footer>
		<div class="group">
			<Dropdown label="Goal" items={$goals ?? []} propLabel="name" bind:selected={$selectedGoal} />
			<Calendar id="target_date" name="target_date" bind:value={task.target_date} />
		</div>
		<div class="group">
			<Button size="small" variant="secondary" label="Cancel" on:click={cancel} />
			<Button size="small" type="submit" form={formId} label="Save task" />
		</div>
	</footer>
</form>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-common);
		border-radius: var(--br-md);
		width: 100%;
		padding: var(--spacing-md);
		gap: var(--spacing-sm);
	}
	.group {
		display: flex;
		gap: var(--spacing-sm);
	}
	footer {
		display: flex;
		justify-content: space-between;
	}
</style>
