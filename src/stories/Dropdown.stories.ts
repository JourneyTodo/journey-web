import type { Meta, StoryObj } from '@storybook/svelte';
import Dropdown from '../lib/components/Dropdown.svelte';

const meta = {
	title: 'Example/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: { type: 'array' },
			defaultValue: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
		}
	}
} satisfies Meta<Dropdown<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Dropdown',
		propLabel: null,
		items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
	}
};
