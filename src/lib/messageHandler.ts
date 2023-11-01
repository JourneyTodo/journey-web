import { error } from '@sveltejs/kit';
// import { setContext, type ComponentType } from 'svelte';

export class MessageHandler {
	// map of all queues
	// When an add/delete is triggered, it will lookup by key to find the correct spot
	// TODO: refactor to a set of stores
	private queueMap: Map<string, Message[]> = new Map();

	public add(message: Message) {
		let messages = this.queueMap.get(message.key);
		if (messages === undefined) {
			messages = [message];
			this.queueMap.set(message.key, messages);
		} else {
			messages.push(message);
			this.queueMap.set(message.key, messages);
		}
		// TODO: figure out how to get this to work with vite test (mock??)
		// setContext(message.key, messages);
		return messages.length;
	}

	public delete(message: Message) {
		let messages = this.queueMap.get(message.key);
		if (messages === undefined) {
			throw error(404, 'The message could not be found');
		}
		messages = messages.filter((m: Message) => m !== message);
		this.queueMap.set(message.key, messages);
		this.cleanMap(message.key, messages);
	}

	public getAll(key: string): Message[] | undefined {
		const messages = this.queueMap.get(key);
		if (messages === undefined) {
			return undefined;
		}

		return messages;
	}

	private cleanMap(key: string, messages: Message[]) {
		if (messages.length === 0) {
			this.queueMap.delete(key);
		}
	}
}

export type Message = {
	key: string;
	lifespan?: number;
	content: string | HTMLElement;
};
