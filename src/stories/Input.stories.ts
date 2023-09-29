import type { Meta, StoryObj } from '@storybook/svelte';

import Input from '../lib/components/Input.svelte';

const meta = {
	title: 'Example/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' }
	}
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: 'Input'
	}
};
