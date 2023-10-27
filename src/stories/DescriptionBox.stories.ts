import type { Meta, StoryObj } from '@storybook/svelte';

import DescriptionBox from '../lib/components/DescriptionBox.svelte';

const meta = {
	title: 'Example/DescriptionBox',
	component: DescriptionBox,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' }
	}
} satisfies Meta<DescriptionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		placeholder: 'Description'
	}
};
