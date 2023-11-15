<script lang="ts">
	import { currentGoal, deleteModalIsOpen } from '$lib/stores/modals.store';
	import type { Goal } from '$lib/types/sb';
	import Button from './Button.svelte';
	import EllipsisButton from './EllipsisButton.svelte';
	import Icon from './Icon/Icon.svelte';

	export let showMenu = false;
	export let goal: Goal;

	function handleDelete() {
		deleteModalIsOpen.set(true);
		currentGoal.set(goal);
		showMenu = false;
	}
</script>

<EllipsisButton bind:showMore={showMenu}>
	<Button
		slot="items"
		size="small"
		variant="secondary"
		action="destructive"
		fill
		on:click={handleDelete}
	>
		<Icon name="trashcan" slot="icon-start" />
		Delete
	</Button>
</EllipsisButton>
