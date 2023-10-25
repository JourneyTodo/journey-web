export type Icon = {
	paths: string[];
	rotate?: number;
};

export const paths: Record<string, Icon> = {
	'chevron-down': {
		paths: ['M17 10.4L12 14.9L7 10.4']
	},
	plus: {
		paths: ['M12 7V17M17 12H7']
	},
	close: {
		paths: ['M6.65685 6.34315L17.9706 17.6569M17.9706 6.34315L6.65685 17.6569']
	},
	checkmark: {
		paths: ['M1 5L5 9L13 1']
	}
};

export default paths;
