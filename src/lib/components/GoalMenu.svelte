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
	<div class="btns" slot="items">
		<Button size="small" variant="ghost" fill style="justify-content: start;">
			<Icon name="edit" slot="icon-start" />
			Edit goal
		</Button>
		<Button
			size="small"
			variant="ghost"
			action="destructive"
			fill
			style="justify-content: start;"
			on:click={handleDelete}
		>
			<Icon name="trashcan" slot="icon-start" />
			Delete goal
		</Button>
	</div>
</EllipsisButton>

<style lang="scss">
	.btns {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
</style>
