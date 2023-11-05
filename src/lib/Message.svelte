<script lang="ts">
	import type { Message } from './messageHandler';
	import { messageHandler as mh } from '$lib/messageHandler.js';
	import { quintInOut } from 'svelte/easing';
	import Button from './components/Button.svelte';
	import Icon from './components/Icon/Icon.svelte';
	import { Timer } from './Timer';

	export let message: Message;
	export let type: 'banner' | 'toast' = 'toast';
	let timer: Timer;

	if (message.lifespan) {
		timer = new Timer(() => {
			deleteMessage();
		}, message.lifespan);
		timer.start();
	}

	function deleteMessage() {
		mh.pop(message.id!);
	}

	function pauseTimer() {
		timer.pause();
	}
	function resumeTimer() {
		timer.resume();
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

<!-- 
  TODO: Write helpers to sanitize message and convert it to more html
  ex: if it was a task added, we want to display a link to the goal
 -->

<div
	role="alertdialog"
	class="message {type}"
	in:fadeSlide={{ duration: 400, start: true }}
	out:fadeSlide={{ duration: 400, start: false }}
	on:mouseenter={() => pauseTimer()}
	on:mouseleave={() => resumeTimer()}
>
	<span class="value">{message.value}</span>
	<Button size="xsmall" variant="ghost" style="padding: 0" on:click={deleteMessage}>
		<Icon name="close" />
	</Button>
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

	.value {
		max-width: 240px;
		overflow: hidden;
		// TODO: update this to use line-clamp & flexbox when browsers support it
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
