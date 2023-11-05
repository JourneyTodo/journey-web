<script lang="ts">
	import type { Message as MType } from './messageHandler';
	import Message from './Message.svelte';
	import { messageHandler as mh } from '$lib/messageHandler.js';
	import { cubicOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	export let messages: MType[] = [];

	$: messages = $mh;
</script>

<div class="container">
	<ul class="message-list">
		<!--
      (message.id) is needed to make sure we
      track items correctly when they change reactively
    -->
		{#each messages as message (message.id)}
			<!-- Use flip here to smoothly transition messages when one is deleted -->
			<li class="msg" animate:flip={{ duration: 400, delay: 200, easing: cubicOut }}>
				<Message {message} />
			</li>
		{/each}
	</ul>
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
