import type { Goal } from '$lib/types/sb';

export const setTitle = (title: string) => {
	return `${title} – Journey`;
};

export const titleCase = (str: string) => {
	return str.replace(/\w\S*/g, (word) => {
		return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
	});
};

export const toPastTense = (str: string) => {
	const c = str[str.length - 1];
	switch (c) {
		case 'e':
			return str + 'd';
		default:
			return str + 'ed';
	}
};

// Assumes name is in the format "First Last" and first name has no spaces
export const getFirstName = (name: string) => {
	return name.split(' ')[0];
};

export const addChildrenPropToObject = <T>(object: T): T & { children: T[] } => {
	return { ...object, children: [] };
};

type GenericIdToParent = {
	id: T;
	parent_id: T | null | undefined;
};

export const createIdToParentMap = (objList: GenericIdToParent[]) => {
	const idToParent = new Map<GenericIdToParent['id'], GenericIdToParent['parent_id']>();
	objList.forEach((objList) => {
		idToParent.set(objList.id, objList.parent_id);
	});
	return idToParent;
};

export const parseTimestamp = (timestamp: string): number => {
	const ts = Date.parse(timestamp);
	if (!isNaN(ts)) {
		return ts;
	}
	return -1;
};

export const getDayAndMonth = (dateStr: string) => {
	const date = new Date(dateStr);
	const month = date.toLocaleString('en-us', { month: 'long' });
	const day = date.getUTCDate();
	return `${month} ${day}`;
};
export const getDayOfWeek = (dateStr: string) => {
	const date = new Date(dateStr);
	const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });
	return `${dayOfWeek}`;
};

export const isTodayOrTomorrow = (dateStr: string): string | undefined => {
	const date = new Date(Date.parse(dateStr));
	const now = new Date();

	if (isSameDay(date, now)) {
		return 'Today';
	} else if (isNextDay(date, now)) {
		return 'Tomorrow';
	}

	// If the date is neither today nor tomorrow
	return undefined;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	);
};

const isNextDay = (date1: Date, date2: Date): boolean => {
	const nextDay = new Date(date2);
	nextDay.setDate(date2.getDate() + 1);
	return isSameDay(date1, nextDay);
};

export const findGoal = (id: string, goals: Goal[]): Goal | undefined => {
	return goals.find((g: Goal) => g.id === id);
};
