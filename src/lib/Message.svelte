<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Message } from './messageHandler';
	import { fly } from 'svelte/transition';

	export let message: Message;
	export let index: number = 0; // Sets the z-index
	export let type: 'banner' | 'toast' = 'toast';

	const dispatch = createEventDispatcher();

	function deleteMessage(message: Message) {
		dispatch('change', {
			message
		});
	}

	if (message.lifespan) {
		setTimeout(function () {
			deleteMessage(message);
		}, message.lifespan);
	}
</script>

<!-- {#key index} -->
<div
	class="message {type}"
	style="z-index: {100 - index};"
	transition:fly={{ y: 200, duration: 40 }}
>
	{message.content}
</div>

<!-- {/key} -->

<style lang="scss">
	.message {
		display: inline-flex;
		padding: var(--spacing-lg);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
	}
	.toast {
		border-radius: var(--br-md);
		background: white;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
	}
</style>
