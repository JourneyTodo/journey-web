<script lang="ts">
	import { selectedGoal, taskModalIsOpen } from '$lib/stores/modals.store';
	import type { Goal } from '$lib/types/sb';
	import Button from '../Button.svelte';
	import Icon from '../Icon/Icon.svelte';

	export let goal: Goal | null;

	function showModal() {
		if (goal) {
			selectedGoal.set(goal);
		}
		taskModalIsOpen.set(true);
	}
</script>

<Button
	variant="ghost"
	size="small"
	fill
	style="justify-content: start; padding-inline-start: 0;"
	on:click={showModal}
>
	<span style="opacity: var(--opacity-subtext);">Add task</span>
	<Icon
		slot="icon-start"
		name="plus"
		style="color: var(--more-powerful-purple) !important; opacity: 1 !important;"
	/>
</Button>
