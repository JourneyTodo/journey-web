import type { Meta, StoryObj } from '@storybook/svelte';

import Button from '../lib/components/Button.svelte';

const meta = {
	title: 'Example/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			defaultValue: 'medium'
		},
		circle: {
			control: { type: 'boolean' },
			defaultValue: false
		}
	}
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: 'Button'
	}
};

export const Secondary: Story = {
	args: {
		label: 'Button'
	}
};

export const Large: Story = {
	args: {
		size: 'large',
		label: 'Button'
	}
};

export const Small: Story = {
	args: {
		size: 'small',
		label: 'Button'
	}
};
