import { describe, it, expect } from 'vitest';
import { MessageHandler, type Message } from './messageHandler';

describe('messageHandler functions', () => {
	it('should add messages to the map', () => {
		const messageHandler = new MessageHandler();
		const key = 'test';
		const m1: Message = {
			key: key,
			content: 'm1'
		};
		const m2: Message = {
			key: key,
			content: 'm2'
		};

		messageHandler.add(m1);
		messageHandler.add(m2);

		const result = messageHandler.getAll(key);

		expect(result).toBeTruthy();
		expect(result?.length).toBe(2);
		expect(result).toContain(m1);
		expect(result).toContain(m2);
	});

	it('should delete messages from the map', () => {
		const messageHandler = new MessageHandler();
		const key = 'test';
		const m1: Message = {
			key: key,
			content: 'm1'
		};

		messageHandler.add(m1);
		messageHandler.delete(m1);

		const result = messageHandler.getAll(key);

		expect(result).toBeUndefined();
	});
});
