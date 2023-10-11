<script lang="ts">
	import GoalTree from '../side-nav/GoalTree.svelte';

	export let data;

	let { goals } = data;
</script>

<h1>Goals</h1>

<GoalTree {goals} let:goal>
	<li>{goal.name}</li>
</GoalTree>
