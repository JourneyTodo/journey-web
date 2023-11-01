<script lang="ts">
	import Messages from '$lib/Messages.svelte';
	import { setTitle } from '$lib/functions/utils.js';
	import { MessageHandler } from '$lib/messageHandler.js';

	export let data;

	let { user } = data;
	$: ({ user } = data);

	const mh = new MessageHandler();
	const key = 'test';
	mh.add({
		key: key,
		content: 'foo',
		lifespan: 1000
	});
	mh.add({
		key: key,
		content: 'bar',
		lifespan: 3000
	});
	mh.add({
		key: key,
		content: 'baz'
	});
</script>

<svelte:head>
	<title>{setTitle(user.full_name ?? 'User')}</title>
</svelte:head>

<Messages {key} />
