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
	// Kind of hacky, but for whatever reason the placeholder only shows up when content
	// is undefined, but it cant be SET to undefined or it wont show up...
	let newDescription: string;

	$: selectedGoal.set($goals?.find((g) => g.id === task.goal_id) ?? null);

	onMount(() => {
		if (task.description) newDescription = task.description;
		editingTask.set(true);
	});

	function handleBtn() {
		isEdit = false;
		editingTask.set(false);
	}

	function escape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isEdit = false;
		}
	}
</script>

<div class="container" role="presentation" on:keyup={escape}>
	<form id={formId} action="/?/updateTask" method="POST" use:enhance={handleBtn}>
		<input id="name" type="hidden" name="name" value={task.name} />
		<input id="description" type="hidden" name="description" value={newDescription} />
		<input id="description" type="hidden" name="target_date" value={task.target_date} />
		<input type="hidden" name="user_id" value={task.user_id} />
		<input type="hidden" name="id" value={task.id} />
		<input type="hidden" name="goal_id" value={task.goal_id} />
		<div class="boxes">
			<DescriptionBox
				id="name"
				name="name"
				label="Task name"
				placeholder="Task name"
				focus
				required
				bind:content={task.name}
			/>
			<DescriptionBox
				id="description"
				name="description"
				bind:content={newDescription}
				style="font-size: var(--text-xs)"
			/>
		</div>
		<footer>
			<div class="group">
				<Dropdown
					label="Goal"
					items={$goals ?? []}
					propLabel="name"
					bind:selected={$selectedGoal}
				/>
				<Calendar
					id="target_date"
					name="target_date"
					bind:selectedDate={task.target_date}
					targetDate={task.target_date}
				/>
			</div>
			<div class="group">
				<Button size="small" variant="secondary" label="Cancel" on:click={handleBtn} />
				<Button size="small" type="submit" form={formId} label="Save task" />
			</div>
		</footer>
	</form>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-common);
		border-radius: var(--br-md);
		width: 100%;
		padding: var(--spacing-md) calc(var(--spacing-md) / 2);
		gap: var(--spacing-sm);
	}
	.boxes {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding: 0 calc(var(--spacing-md) / 2 + 0.1875rem);
		margin-bottom: var(--spacing-sm);
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
