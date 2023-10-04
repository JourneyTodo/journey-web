<script lang="ts">
	export let goals: any;
</script>

<ul>
	{#each goals as goal}
		<li>
			<slot {goal} />
			{#if goal.children}
				<svelte:self goals={goal.children} let:goal>
					<slot {goal} />
				</svelte:self>
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 30px;
	}
</style>
