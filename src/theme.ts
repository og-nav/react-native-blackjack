import { extendTheme } from 'native-base';

const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
};

const colors = {
	primary: {
		0: '#FFFFFF',
		50: '#ECEFF1',
		100: '#CFD8DC',
		200: '#B0BEC5',
		300: '#90A4AE',
		400: '#78909C',
		500: '#607D8B',
		600: '#546E7A',
		700: '#455A64',
		800: '#37474F',
		900: '#263238',
	},

	brown: {
		50: '#EFEBE9',
		100: '#D7CCC8',
		200: '#BCAAA4',
		300: '#A1887F',
		400: '#8D6E63',
		500: '#795548',
		600: '#6D4C41',
		700: '#5D4037',
		800: '#4E342E',
		900: '#3E2625',
	},

	tintColorLight: '#2f95dc',
	tintColorDark: '#fff',
};

export default extendTheme({ config, colors });
