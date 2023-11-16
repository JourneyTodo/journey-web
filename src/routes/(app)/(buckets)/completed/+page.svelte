<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import CompletedTaskList from '$lib/components/Tasks/CompletedTaskList.svelte';

	export let data;

	let { tasks } = data;
	$: ({ tasks } = data);
</script>

<Header title="Completed" />
<CompletedTaskList {tasks} />
