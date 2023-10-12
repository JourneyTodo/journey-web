export const setTitle = (title: string) => {
	return `${title} – Journey`;
};

export const titleCase = (str: string) => {
	return str.replace(/\w\S*/g, (word) => {
		return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
	});
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
