<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import TaskList from '$lib/components/Tasks/TaskList.svelte';
	import { currentDate } from '$lib/stores/modals.store.js';

	export let data;

	let now = new Date();
	let { tasks } = data;
	$: ({ tasks } = data);

	now.setDate(now.getDate() + 1);
	$: currentDate.set(now.toISOString());
</script>

<Header title="Upcoming" />
{#if tasks}
	<TaskList {tasks} goal={null} />
{/if}
