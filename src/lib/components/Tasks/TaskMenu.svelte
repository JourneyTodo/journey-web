<script lang="ts">
	import { currentTask, deleteModalIsOpen } from '$lib/stores/modals.store';
	import type { Task } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import EllipsisButton from '../EllipsisButton.svelte';

	export let showMenu = false;
	export let menuActive = false;
	export let task: Task;

	function handleDelete(): void {
		deleteModalIsOpen.set(true);
		currentTask.set(task);
		showMenu = false;
	}
</script>

<EllipsisButton bind:showMore={menuActive}>
	<Button
		slot="items"
		size="small"
		variant="secondary"
		action="destructive"
		fill
		on:click={handleDelete}
		>Delete
	</Button>
</EllipsisButton>
