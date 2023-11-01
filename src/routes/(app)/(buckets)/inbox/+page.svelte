<script lang="ts">
	import TaskList from '$lib/components/Tasks/TaskList.svelte';

	export let data;

	let { tasks } = data;
	$: ({ tasks } = data);
</script>

<h1>Inbox</h1>
<TaskList {tasks} goal={null} />
