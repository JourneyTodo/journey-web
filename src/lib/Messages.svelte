<script lang="ts">
	import { getContext } from 'svelte';
	import type { Message as MType } from './messageHandler';
	import Message from './Message.svelte';

	export let key: string;

	let messages = getContext(key) as MType[];

	function deleteMessage(message: MType) {
		messages = messages.filter((m) => m !== message);
	}
</script>

<div class="container">
	<div class="message-list">
		{#each messages as message, i}
			<Message {message} index={i} on:change={() => deleteMessage(message)} />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		position: absolute;
		left: var(--spacing-xl);
		bottom: var(--spacing-xl);
	}
	.message-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
</style>
