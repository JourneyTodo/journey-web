<script lang="ts">
	import type { Message } from './messageHandler';
	import { messageHandler as mh } from '$lib/messageHandler.js';
	import { quintInOut } from 'svelte/easing';

	export let message: Message;
	export let type: 'banner' | 'toast' = 'toast';

	function deleteMessage(id: number) {
		mh.pop(id);
	}

	if (message.lifespan) {
		setTimeout(function () {
			deleteMessage(message.id!);
		}, message.lifespan);
	}

	function fadeSlide(node: HTMLElement, { duration = 0, delay = 0, start = false }) {
		return {
			duration,
			delay,
			easing: quintInOut,
			css: (t: number, u: number) => {
				return `
        opacity: ${t};
        transform: translateY(${start ? -u * 5 : u * 5}%);
        `;
			}
		};
	}
</script>

<div
	class="message {type}"
	in:fadeSlide={{ duration: 400, start: true }}
	out:fadeSlide={{ duration: 400, start: false }}
>
	{message.content}
</div>

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
