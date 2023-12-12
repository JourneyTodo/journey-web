<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import Calendar from '../Calendar.svelte';
	import DescriptionBox from '../DescriptionBox.svelte';
	import Dropdown from '../Dropdown.svelte';
	import { selectedGoal } from '$lib/stores/modals.store';
	import { editingTask, goals } from '$lib/stores/globals.store';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let task: Task;
	export let isEdit = false;
	let formId = `edit-${task.id}`;
	$: selectedGoal.set($goals?.find((g) => g.id === task.goal_id) ?? null);
	$: console.log('target', task.target_date, typeof task.target_date);

	onMount(() => {
		editingTask.set(true);
	});

	function handleBtn() {
		isEdit = false;
		editingTask.set(false);
	}
</script>

<form id={formId} class="container" action="/?/updateTask" method="POST" use:enhance={handleBtn}>
	<input id="name" type="hidden" name="name" value={task.name} />
	<input id="description" type="hidden" name="description" value={task.description} />
	<input id="description" type="hidden" name="target_date" value={task.target_date} />
	<input type="hidden" name="user_id" value={task.user_id} />
	<input type="hidden" name="id" value={task.id} />
	<input type="hidden" name="goal_id" value={task.goal_id} />
	<DescriptionBox id="name" header label="Task name" focus required bind:content={task.name} />
	<DescriptionBox id="description" name="description" bind:content={task.description} />
	<footer>
		<div class="group">
			<Dropdown label="Goal" items={$goals ?? []} propLabel="name" bind:selected={$selectedGoal} />
			<Calendar id="target_date" name="target_date" bind:selectedDate={task.target_date} />
		</div>
		<div class="group">
			<Button size="small" variant="secondary" label="Cancel" on:click={handleBtn} />
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
