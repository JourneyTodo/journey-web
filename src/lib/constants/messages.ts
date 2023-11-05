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
type ItemType = 'goal' | 'task';

type StatusType = 'success' | 'error';

type ActionType = 'add' | 'delete' | 'update' | 'complete' | 'uncomplete';

const successGeneric = (type: ItemType, action: ActionType, name?: string) =>
	`${titleCase(type)} ${name ? name + ' ' : ''}${toPastTense(action)}`;
const errorGeneric = (type: ItemType, action: ActionType) => `${unableTo} ${action} ${type}`;

const genericBundle = (type: ItemType, action: ActionType, name?: string): MessageBundle => ({
	success: {
		type: 'success',
		message: successGeneric(type, action, name)
	} as FlashMessage,
	error: {
		type: 'error',
		message: errorGeneric(type, action)
	} as FlashMessage
});

const addGeneric = (type: ItemType, name?: string): MessageBundle => ({
	success: {
		type: 'success',
		message: `${titleCase(type)} added to ${name ? name + ' ' : ''}`
	},
	error: {
		type: 'error',
		message: errorGeneric(type, 'add')
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

export const taskDeleted = deleteGeneric('task');
export const taskUpdated = updateGeneric('task');
export const taskAdded = (name: string): MessageBundle => addGeneric('task', name);
export const taskCompleted = (uncomplete: boolean) => completeGeneric('task', uncomplete);

export const goalDeleted = deleteGeneric('goal');
export const goalUpdated = updateGeneric('goal');
export const goalCompleted = (uncomplete: boolean) => completeGeneric('goal', uncomplete);
export const goalAdded = (name: string): MessageBundle => addGeneric('goal', name);

export const orderChanged = 'Order changed';
