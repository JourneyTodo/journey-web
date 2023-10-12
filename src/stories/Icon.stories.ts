import type { Meta, StoryObj } from '@storybook/svelte';

import Icon from '../lib/components/Icon/Icon.svelte';
import Icons from '../lib/components/Icon/paths';

const meta = {
	title: 'Example/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: { type: 'select' },
			options: Object.keys(Icons)
		}
	}
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'chevron-down'
	}
};
