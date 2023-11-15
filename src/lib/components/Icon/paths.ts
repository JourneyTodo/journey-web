// TODO: figure out how we can handle paths & circles when they're a different order
export type Icon = {
	paths?: string[];
	circles?: circle[];
	rotate?: number;
};

type circle = {
	cx: number;
	cy: number;
	r: number;
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
	},
	ellipsis: {
		circles: [
			{
				cx: 6.5,
				cy: 12.25,
				r: 1.25
			},
			{
				cx: 12,
				cy: 12.25,
				r: 1.25
			},
			{
				cx: 17.5,
				cy: 12.25,
				r: 1.25
			}
		]
	},
	trashcan: {
		paths: [
			'M9.08721 8.08721L8.77666 6.15901C8.67876 5.55111 9.14821 5 9.76394 5H13.9564C14.572 5 15.0414 5.55091 14.9437 6.15872L14.6337 8.08721M9.08721 8.08721H6.71512M9.08721 8.08721H14.6337M14.6337 8.08721H17.0058M6.71512 8.08721V18.75C6.71512 19.3023 7.16283 19.75 7.71512 19.75H16.0058C16.5581 19.75 17.0058 19.3023 17.0058 18.75V8.08721M6.71512 8.08721H5M17.0058 8.08721H18.7209',
			'M13.6046 10.4883C13.6046 12.8996 13.6046 17.3488 13.6046 17.3488M10.1163 10.4883C10.1163 12.8996 10.1163 17.3488 10.1163 17.3488'
		]
	}
};

export default paths;
