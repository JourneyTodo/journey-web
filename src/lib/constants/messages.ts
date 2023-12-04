import { titleCase, toPastTense } from '$lib/functions/utils';

/**
 * Helper phrases for constructing these messages.
 * Ex: 'Please try again later.'
 */
export const helperPhrases = {
	unableTo: 'Unable to',
	tryAgainLater: 'Please try again later.'
};
export const { unableTo, tryAgainLater } = helperPhrases;

export type FlashMessage = {
	type: StatusType;
	message: string;
};

/**
 * The idea here is a MessageBundle can be used on the server to return the correct
 * message depending on the response. And we need both for each request anyway.
 */
export type MessageBundle = {
	success: FlashMessage;
	error: FlashMessage;
};

/**
 * Naming is hard. This is type is for 'items' that requests are for.
 * Currently can be a goal or a task.
 */
type ItemType = 'goal' | 'task' | 'user';

type StatusType = 'success' | 'error';

type ActionType =
	| 'add'
	| 'delete'
	| 'update'
	| 'complete'
	| 'uncomplete'
	| 'order'
	| 'postpone'
	| 'reschedule'
	| 'restore';

export type MessageOptions = {
	text: string;
	type: ItemType;
	action: ActionType;
	url?: string;
	location?: string;
};

const createString = (
	text: string,
	type: ItemType,
	action: ActionType,
	url?: string,
	location?: string
): string => {
	const mOptions: MessageOptions = {
		text,
		type,
		action,
		url,
		location
	};
	return JSON.stringify(mOptions);
};

export const parseString = (str: string): MessageOptions | null => {
	try {
		const mOptions = JSON.parse(str) as MessageOptions;
		// Validate
		if (isMessageOptions(mOptions)) {
			return mOptions;
		}
	} catch {
		console.error('message options could not be parsed. string was: ' + str);
	}
	return null;
};

const isMessageOptions = (obj: unknown): obj is MessageOptions => {
	return 'text' in obj && 'type' in obj && 'action' in obj;
};

const successGeneric = (type: ItemType, action: ActionType, name?: string) =>
	`${titleCase(type)} ${name ? name + ' ' : ''}${toPastTense(action)}`;
const errorGeneric = (type: ItemType, action: ActionType) => `${unableTo} ${action} ${type}`;

const genericBundle = (type: ItemType, action: ActionType, name?: string): MessageBundle => ({
	success: {
		type: 'success',
		message: createString(successGeneric(type, action, name), type, action)
	} as FlashMessage,
	error: {
		type: 'error',
		message: createString(errorGeneric(type, action), type, action)
	} as FlashMessage
});

const addGeneric = (type: ItemType, url: string, location?: string): MessageBundle => ({
	success: {
		type: 'success',
		message: createString(`${titleCase(type)} added`, type, 'add', url, location)
	},
	error: {
		type: 'error',
		message: createString(errorGeneric(type, 'add'), type, 'add', url, location)
	}
});

const completeGeneric = (type: ItemType, uncomplete: boolean = false): MessageBundle => {
	return genericBundle(type, uncomplete ? 'uncomplete' : 'complete');
};

const deleteGeneric = (type: ItemType): MessageBundle => {
	return genericBundle(type, 'delete');
};

const updateGeneric = (type: ItemType): MessageBundle => {
	return genericBundle(type, 'update');
};

const postponeGeneric = (type: ItemType): MessageBundle => {
	return genericBundle(type, 'postpone');
};

const rescheduleGeneric = (type: ItemType): MessageBundle => {
	return genericBundle(type, 'reschedule');
};

export const taskDeleted = deleteGeneric('task');
export const taskUpdated = updateGeneric('task');
export const taskAdded = (url: string, location?: string): MessageBundle =>
	addGeneric('task', url, location);
export const taskCompleted = (uncomplete: boolean) => completeGeneric('task', uncomplete);
export const taskPostponed = () => postponeGeneric('task');
export const taskRescheduled = () => rescheduleGeneric('task');
export const taskRestored = () => genericBundle('task', 'restore');

export const goalDeleted = deleteGeneric('goal');
export const goalUpdated = updateGeneric('goal');
export const goalCompleted = (uncomplete: boolean) => completeGeneric('goal', uncomplete);
export const goalAdded = (name: string): MessageBundle => addGeneric('goal', name);

export const orderChanged = createString('Order changed', 'goal', 'order'); // Keep things simple here

export const settingsUpdated: MessageBundle = {
	success: {
		type: 'success',
		message: createString('User settings saved successfully', 'user', 'update')
	},
	error: {
		type: 'error',
		message: createString('Unable to save user settings', 'user', 'update')
	}
};
