import type { Database } from '$lib/types/database';

export type dbGoal = Database['public']['Tables']['goals']['Row'];

export type GenericTree<T> = T & {
	children: GenericTree<T>[];
};

export function listToTree(list: { id: number; parent_id: number | null }[]): GenericTree<T>[] {
	const map = new Map<keyof GenericTree<T>, GenericTree<T>>();
	const tree: GenericTree<T>[] = [];

	// first sort list to ensure parent nodes are before child nodes
	list.sort((a, b) => {
		if (a.parent_id === b.parent_id) return 0;
		if (a.parent_id === null) return -1;
		if (b.parent_id === null) return 1;
		return a.parent_id < b.parent_id ? -1 : 1;
	});

	// create hashmap of nodes
	list.forEach((item) => {
		const id = item.id;
		map.set(id, item);
		map.get(id).children = [];
	});

	// iterate over nodes and assign parent/child relationships
	map.forEach((node) => {
		if (node.parent_id !== null) {
			const parent = map.get(node.parent_id);
			parent.children.push(node);
		} else {
			tree.push(node);
		}
	});

	return tree;
}
