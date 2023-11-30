<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import TaskList from '$lib/components/Tasks/TaskList.svelte';

	export let data;

	let { tasks } = data;
	$: ({ tasks } = data);
</script>

<Header title="Today" />
{#if tasks}
	<TaskList {tasks} goal={null} />
{/if}
