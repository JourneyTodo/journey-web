import Calendar from '$lib/components/Calendar.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Example/Calendar',
	component: Calendar,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
