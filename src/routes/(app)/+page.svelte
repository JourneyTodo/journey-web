<script lang="ts">
	import { setTitle } from '$lib/functions/utils.js';

	export let data;

	let { user } = data;
	$: ({ user } = data);

	// This is what you need to add a message on success/fail
	// Is there a way to do this at a layout level so I don't have to write this on every page?
	// export let form;
	// $: if (form?.success) {
	//   mh.push({
	//     content: 'success',
	//     lifespan: 5000
	//   });
	// }
</script>

<svelte:head>
	<title>{setTitle(user.full_name ?? 'User')}</title>
</svelte:head>
