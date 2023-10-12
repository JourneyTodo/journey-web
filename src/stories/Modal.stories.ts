import type { Meta, StoryObj } from '@storybook/svelte';

import Modal from '../lib/components/Modal.svelte';

const meta = {
	title: 'Example/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		open: { control: 'boolean', defaultValue: false }
	}
} satisfies Meta<Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: 'Modal',
		isOpen: false
	}
};
