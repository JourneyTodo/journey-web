<script lang="ts">
	import type { Goal } from '$lib/types/sb';
	export let goals: Goal[] = [];
</script>

<ul class="goals-list">
	{#each goals as goal}
		<slot {goal} />
		{#if goal.children}
			<!-- TODO: Figure out why this let:goal causes eslint to freeze -->
			<svelte:self let:goal goals={goal.children}>
				<slot {goal} />
			</svelte:self>
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul.goals-list {
		margin: 0;
		list-style: none;
		padding-inline-start: 1.5rem;
	}
</style>
