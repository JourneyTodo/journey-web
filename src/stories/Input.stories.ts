import type { Meta, StoryObj } from '@storybook/svelte';

import Input from '../lib/components/Input.svelte';

const meta = {
	title: 'Example/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		id: { control: 'text', defaultValue: 'input' },
		type: { control: 'text', defaultValue: 'text' }
	}
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: 'Input',
		id: 'input',
		type: 'text'
	}
};

export const Password: Story = {
	args: {
		label: 'Input',
		id: 'input',
		type: 'password'
	}
};
