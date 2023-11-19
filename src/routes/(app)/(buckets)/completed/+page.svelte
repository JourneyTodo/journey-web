<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import CompletedTaskList from '$lib/components/Tasks/CompletedTaskList.svelte';

	export let data;

	let { tasks, goals } = data;
	$: ({ tasks, goals } = data);
</script>

<Header title="Completed" />
<CompletedTaskList tasksByDates={tasks} {goals} />
