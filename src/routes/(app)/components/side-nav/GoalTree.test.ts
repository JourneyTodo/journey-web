import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import GoalTree from './GoalTree.svelte';

describe('GoalTree', () => {
	const data = [
		{
			id: 0,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'Reach financial independence',
			index: 0,
			created_at: '2023-10-04T01:16:15.153696+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: null,
			parent_id: null
		},
		{
			id: 1,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'Build an emergency fund of 6 months of expenses',
			index: 1,
			created_at: '2023-10-04T01:25:06.894879+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: null,
			parent_id: 0
		},
		{
			id: 2,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'Create a budget',
			index: 2,
			created_at: '2023-10-04T02:13:58.992435+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: null,
			parent_id: 0
		},
		{
			id: 3,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'Save aggressively for the next 2 months',
			index: 3,
			created_at: '2023-10-04T02:14:56.540889+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: null,
			parent_id: 1
		},
		{
			id: 4,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'test',
			index: 4,
			created_at: '2023-10-11T01:20:04.154255+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: 'woo',
			parent_id: null
		},
		{
			id: 5,
			user_id: 'f7af2121-ef15-4ae4-8eb4-0c0c94e71b57',
			name: 'Oct 10 goal',
			index: 5,
			created_at: '2023-10-11T02:07:13.604382+00:00',
			updated_at: null,
			target_date: null,
			completed_at: null,
			completed: false,
			description: null,
			parent_id: null
		}
	];
	it('should be created', () => {
		const component = render(GoalTree, { goals: data });

		expect(component).toBeTruthy();

		component.unmount();
	});

	/// TODO: finish this test
	// it('should indent list items based on their tree depth', () => {
	// 	const component = render(GoalTree, { goals: data });

	//   const list = component.getByTestId('goal-tree');
	//   const listItems = list.querySelectorAll('li');

	//   expect(component.component.idToParent).not.toBeNull();

	//   expect(listItems[0].style.marginLeft).toBe('0px');
	//   expect(listItems.length).toBe(6);
	// });
});
