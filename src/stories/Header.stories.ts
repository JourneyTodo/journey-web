import type { Meta, StoryObj } from '@storybook/svelte';

import Header from '../lib/components/Header.svelte';

const meta = {
	title: 'Example/Header',
	component: Header,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: { type: 'text' },
			defaultValue: 'Header'
		}
	}
} satisfies Meta<Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Header',
		numCompleted: 45,
		total: 100
	}
};
