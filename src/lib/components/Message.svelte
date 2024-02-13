<script lang="ts">
	import type { Message } from '../MessageHandler';
	import { messageHandler as mh } from '$lib/MessageHandler.js';
	import { quintInOut } from 'svelte/easing';
	import Button from './Button.svelte';
	import Icon from './Icon/Icon.svelte';
	import { Timer } from '../Timer';
	import { parseString, type MessageOptions } from '../constants/messages';
	import FancyToast from './FancyToast.svelte';

	export let message: Message;
	export let type: 'banner' | 'toast' = 'toast';

	let timer: Timer;
	let options: MessageOptions;
	$: parseMesssge();

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

	function parseMesssge() {
		const obj = parseString(message.value);
		if (!obj) {
			return;
		}
		options = obj;
	}
</script>

<div
	role="alertdialog"
	class="message {type}"
	in:fadeSlide={{ duration: 400, start: true }}
	out:fadeSlide={{ duration: 400, start: false }}
	on:mouseenter={() => pauseTimer()}
	on:mouseleave={() => resumeTimer()}
>
	{#if options}
		<!-- For now, we only show the fancy stuff when its a success message -->
		{#if options.action === 'add' && message.status === 'success'}
			<FancyToast
				text={options.text}
				buttonLabel="Open"
				url={options.url ?? ''}
				location={options.location ?? ''}
				on:click={() => console.log('todo: task & goal detail modals')}
			/>
		{:else if options.action === 'order'}
			<FancyToast
				text={options.text}
				buttonLabel="Undo"
				on:click={() => console.log('todo: undo order change')}
			/>
		{:else}
			<!-- Fallback to message.value if options is invalid. It'll likely be useful to the user, but at least debugging is easier. -->
			<span class="value">{options ? options.text : message.value}</span>
		{/if}
	{/if}
	<Button size="small" variant="ghost" style="padding: var(--spacing-xs)" on:click={deleteMessage}>
		<Icon name="close" />
	</Button>
</div>

<style lang="scss">
	.message {
		display: inline-flex;
		padding: calc(var(--spacing-lg) - 4px) var(--spacing-lg);
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
	}
	.toast {
		border-radius: var(--br-md);
		background: #fff;
		box-shadow: 0px 2px 3.5px 0px rgba(69, 42, 197, 0.1), 0px 0px 2px 0px rgba(69, 42, 197, 0.16);
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
