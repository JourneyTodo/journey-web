<script lang="ts">
	import { setTitle } from '$lib/functions/utils.js';

	export let data;

	let { user } = data;
	$: ({ user } = data);
</script>

<svelte:head>
	<title>{setTitle(user.full_name ?? 'User')}</title>
</svelte:head>
