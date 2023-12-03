<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import TaskList from '$lib/components/Tasks/TaskList.svelte';

	export let data;

	let { tasks, archivedTasks } = data;
	$: ({ tasks, archivedTasks } = data);
</script>

<Header title="Inbox" />
<TaskList {tasks} {archivedTasks} goal={null} />
