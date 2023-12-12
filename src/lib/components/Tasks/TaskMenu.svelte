<script lang="ts">
	import { enhance } from '$app/forms';
	import { isOverdue } from '$lib/functions/utils';
	import { currentTask, deleteModalIsOpen } from '$lib/stores/modals.store';
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import EllipsisButton from '../EllipsisButton.svelte';
	import Icon from '../Icon/Icon.svelte';

	export let task: Task;
	export let menuActive = false;
	export let isEdit = false;

	let postponeForm = `postpone-task-${task.id}`;

	function handleDelete(): void {
		deleteModalIsOpen.set(true);
		currentTask.set(task);
		menuActive = false;
	}

	function handlePostpone(): void {
		menuActive = false;
	}

	function handleEdit(): void {
		isEdit = true;
		menuActive = false;
	}
</script>

<EllipsisButton bind:showMore={menuActive}>
	<div slot="items" class="btns">
		{#if !task.completed}
			{#if task.target_date && isOverdue(task.target_date)}
				<form
					id={postponeForm}
					class="checkbox-container"
					action="/?/rescheduleTask"
					method="POST"
					use:enhance
				>
					<label hidden for="completed">Completed</label>
					<input type="hidden" name="id" value={task.id} />
					<input type="hidden" name="user_id" value={task.user_id} />
					<input type="hidden" name="target_date" value={new Date().toISOString()} />
					<Button
						size="small"
						variant="ghost"
						fill
						style="justify-content: start;"
						on:click={handlePostpone}
					>
						<i class="today">
							{new Date().getDate()}
						</i>
						Reschedule to today
					</Button>
				</form>
			{:else}
				<form
					id={postponeForm}
					class="checkbox-container"
					action="/?/postponeTask"
					method="POST"
					use:enhance
				>
					<label hidden for="completed">Completed</label>
					<input type="hidden" name="id" value={task.id} />
					<input type="hidden" name="user_id" value={task.user_id} />
					<Button
						size="small"
						variant="ghost"
						fill
						style="justify-content: start;"
						on:click={handlePostpone}
					>
						<Icon name="postpone" slot="icon-start" style="opacity: .8;" />
						Postpone to tomorrow
					</Button>
				</form>
			{/if}
		{/if}
		<Button size="small" variant="ghost" fill style="justify-content: start;" on:click={handleEdit}>
			<Icon name="edit" slot="icon-start" />
			Edit task
		</Button>
		<Button
			slot="items"
			size="small"
			variant="ghost"
			action="destructive"
			fill
			style="justify-content: start;"
			on:click={handleDelete}
		>
			<Icon name="trashcan" slot="icon-start" />
			Delete task
		</Button>
	</div>
</EllipsisButton>

<style lang="scss">
	.btns {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	.today {
		width: 16px;
		height: 16px;
		border: 1px solid var(--text-primary);
		border-radius: var(--br-sm);
		margin: 4px;
		font-size: var(--text-xxs);
		font-weight: bold;
		font-style: normal;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.8;
	}
</style>
