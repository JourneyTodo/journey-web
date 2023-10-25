import type { Meta, StoryObj } from '@storybook/svelte';

import Task from '../lib/components/Tasks/TaskItem.svelte';

const meta = {
	title: 'Example/Task',
	component: Task,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		task: {
			bucket: 1,
			completed: false,
			completed_at: null,
			created_at: '',
			description: 'Description',
			goal_id: null,
			id: '',
			index: null,
			name: 'Task',
			target_date: null,
			updated_at: null,
			user_id: null,
			user_task_id: 0
		}
	}
};

export const NoComplete: Story = {
	args: {
		task: {
			bucket: null,
			completed: null,
			completed_at: null,
			created_at: '',
			description: 'Description',
			goal_id: null,
			id: '',
			index: null,
			name: 'Task',
			target_date: null,
			updated_at: null,
			user_id: null,
			user_task_id: 0
		}
	}
};
