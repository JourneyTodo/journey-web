import { writable } from 'svelte/store';

function createMessageHandler() {
	const { subscribe, update } = writable(new Array<Message>());
	let count = 0;

	function push(msg: Message) {
		if (msg.id === undefined || msg.id === null) {
			msg.id = ++count;
		}
		update((messages) => [...messages, msg]);
		return count;
	}

	function pop(id: number) {
		update((messages) => {
			if (!messages.length || id === 0) {
				return [];
			}
			return messages.filter((m) => m.id !== id);
		});
	}

	function set(id: number, msg: Message) {
		update((messages) => {
			const idx = messages.findIndex((i) => i.id === id);
			if (idx > -1) {
				if (msg.id === undefined || msg.id === null) {
					msg.id = idx;
				}
				messages[idx] = msg;
			}
			return messages;
		});
	}

	function clear() {
		update(() => []);
	}

	return {
		subscribe,
		push,
		pop,
		set,
		clear
	};
}

export type Message = {
	id?: number;
	lifespan?: number;
	value: string | HTMLElement;
};

export const messageHandler = createMessageHandler();
