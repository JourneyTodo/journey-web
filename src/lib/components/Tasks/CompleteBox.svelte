<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Task } from '$lib/types/sb';
	import Checkmark from './Checkmark.svelte';

	export let task: Task;

	const checkTheBox = () => {
		task.completed = !task.completed;
	};
</script>

<form class="checkbox-container" action="/?/completeTask" method="POST" use:enhance>
	<label hidden for="completed">Completed</label>
	<input type="hidden" name="id" value={task.id} />
	<input type="hidden" name="completed" value={task.completed} />
	<button
		type="submit"
		id="completed"
		name="completed"
		class={task.completed ? 'completed' : 'not-completed'}
		on:click={checkTheBox}
	>
		{#if task.completed !== null}
			<Checkmark completed={task.completed ?? false} />
		{/if}
	</button>
</form>

<style lang="scss">
	.checkbox-container {
		display: flex;
		gap: 0.5rem;
		cursor: pointer;

		.not-completed {
			background-color: transparent;
		}
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100%;
			padding: 0;
			width: 20px;
			height: 20px;
			border: 1px solid var(--primitive-outline);
			cursor: pointer;
		}
	}
</style>
