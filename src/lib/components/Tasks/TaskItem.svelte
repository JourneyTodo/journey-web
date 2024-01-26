<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import { slide } from 'svelte/transition';
	import CompleteBox from './CompleteBox.svelte';
	import { quintOut } from 'svelte/easing';
	import TaskMenu from './TaskMenu.svelte';
	import { getDayAndMonth, isTodayOrTomorrow, isOverdue } from '$lib/functions/utils';
	import Button from '../Button.svelte';
	import { enhance } from '$app/forms';
	import EditTask from './EditTask.svelte';

	export let task: Task;
	let showMenu = false;
	let menuActive = false;
	export let isEdit = false;
	let formId = `restore-${task.id}`;

	$: ({ name, description, completed, target_date, is_archived } = task);
	$: overdue = isOverdueHandler();

	function handleMouseOver() {
		showMenu = true;
	}
	function handleMouseOut() {
		if (!menuActive) {
			showMenu = false;
		}
	}
	function isOverdueHandler() {
		if (task.completed) {
			return false;
		}
		return isOverdue(task.target_date!);
	}
</script>

<div
	class="container"
	class:completed
	transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
	role="presentation"
	on:mouseout={handleMouseOut}
	on:mouseover={handleMouseOver}
	on:focus={handleMouseOver}
	on:blur={handleMouseOut}
>
	{#if isEdit}
		<EditTask bind:task bind:isEdit />
	{:else}
		{#if !is_archived && completed !== null}
			<CompleteBox bind:task />
		{/if}
		<div class="text-container">
			<span class="name">{name}</span>
			{#if description}
				<p class="description">{description}</p>
			{/if}
			{#if target_date}
				<p class="description target-date" class:overdue={!completed && overdue && !is_archived}>
					{isTodayOrTomorrow(target_date) ?? getDayAndMonth(target_date)}
				</p>
			{/if}
		</div>
		{#if !is_archived}
			<div class="menu" class:showMenu>
				<TaskMenu bind:menuActive bind:task bind:isEdit />
			</div>
		{:else}
			<form
				id={formId}
				action="/?/restoreTask"
				class="btn-wrapper"
				class:showMenu
				method="POST"
				use:enhance
			>
				<input type="hidden" name="id" value={task.id} />
				<input type="hidden" name="user_id" value={task.user_id} />
				<Button type="submit" variant="secondary" size="small" label="Restore task" />
			</form>
		{/if}
	{/if}
</div>

<style lang="scss">
	.menu,
	.btn-wrapper {
		transition: opacity 150ms linear;
		margin-inline-start: auto;
		opacity: 0;
	}
	.btn-wrapper {
		margin-top: auto;
		margin-bottom: auto;
	}
	.showMenu {
		opacity: 1;
	}
	.container {
		display: flex;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
		// align-items: center;
		border-bottom: 1px solid var(--border-common);
	}
	.text-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.description {
		font-size: var(--text-xs);
		margin: 0;
		opacity: var(--opacity-subtext);
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		// TODO: update this to use line-clamp & flexbox when browsers support it
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.completed {
		.description,
		.name {
			transition: all 200ms ease-out;
			opacity: var(--opacity-50);
			text-decoration: line-through;
		}
	}
	.overdue {
		color: var(--danger-text);
	}
</style>
