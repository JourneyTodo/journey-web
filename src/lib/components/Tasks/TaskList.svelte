<script lang="ts">
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import Icon from '../Icon/Icon.svelte';
	import TaskItem from './TaskItem.svelte';

	export let tasks: Task[];
</script>

<div class="container">
	{#each tasks as task}
		<TaskItem {task} />
	{/each}
	<Button
		variant="ghost"
		size="small"
		label="Add task"
		fill
		style="justify-content: start; padding-inline-start: 0; opacity: .6;"
	>
		<Icon
			slot="icon-start"
			name="plus"
			style="color: var(--more-powerful-purple) !important; opacity: 1 !important;"
		/>
	</Button>
</div>
