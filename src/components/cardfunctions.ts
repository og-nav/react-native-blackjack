var _ = require('lodash');
const suits = ['C', 'D', 'H', 'S'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];

export interface Card {
	value: string | number;
	suit: string;
}

export const createDeck = (n: number) => {
	const deck: Card[] = [];

	for (let m = 0; m < n; m++) {
		for (let i = 0; i < suits.length; i++) {
			for (let j = 0; j < values.length; j++) {
				let card = { value: values[j], suit: suits[i] };
				deck.push(card);
			}
		}
	}

	return deck;
};

export const shuffle = (deck: Card[]) => {
	/*for (let i = 0; i < 1000; i++) {
		const a = Math.floor(Math.random() * deck.length);
		const b = Math.floor(Math.random() * deck.length);
		const temp = deck[a];
		deck[a] = deck[b];
		deck[b] = temp;
	}
	return deck;*/
	return _.shuffle(deck);
};

const tableHead = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

const tableData = [
	['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
	['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
	['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'],
	['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
	['D', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
	['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
	['S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'],
	['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
	['SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP'],
	['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
	['SP', 'SP', 'SP', 'SP', 'SP', 'S', 'SP', 'SP', 'S', 'S'],
	['SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
	['H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H', 'H'],
	['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
	['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
	['H', 'H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
	['H', 'H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
];
const tableTitle = [
	'17+',
	'16',
	'15',
	'14',
	'13',
	'12',
	'11',
	'10',
	'9', //
	'5-8', //
	'A, 8-10', //
	'A, 7', //
	'A, 6', //
	'A, 5', //
	'A, 4', //
	'A, 3', //
	'A, 2', //
	'A, A, 8, 8', //
	'10, 10,', //
	'9, 9', //
	'7, 7', //
	'6, 6', //
	'5, 5', //
	'4, 4', //
	'3, 3', //
	'2, 2', //
];

const d = {
	T: 10,
	J: 10,
	Q: 10,
	K: 10
}

//FIX
export const getAnswer = (ph: Card[], dh: Card) => {
	let dealerIndex = -1;
	if (
		dh.value === 'T' ||
		dh.value === 'J' ||
		dh.value === 'Q' ||
		dh.value === 'K'
	) {
		dealerIndex = 8;
	} else if (dh.value === 'A') {
		dealerIndex = 9;
	} else {
		dealerIndex = tableHead.indexOf(dh.value.toString());
	}
	const p = ph[0].value.toString();
	const pp = ph[1].value.toString();
	let playerIndex = -1;
	if (p === pp) {
		if (p === '2') {
			playerIndex = 25;
		} else if (p === '3') {
			playerIndex = 24;
		} else if (p === '4') {
			playerIndex = 23;
		} else if (p === '5') {
			playerIndex = 22;
		} else if (p === '6') {
			playerIndex = 21;
		} else if (p === '7') {
			playerIndex = 20;
		} else if (p === '9') {
			playerIndex = 19;
		} else if (p === 'T' || p === 'J' || p === 'Q' || p === 'K') {
			playerIndex = 18;
		} else if (p === '8' || p === 'A') {
			playerIndex = 17;
		}
	} else if (p === 'A' || pp === 'A') {
		if (p === '2' || pp === '2') {
			playerIndex = 16;
		} else if (p === '3' || pp === '3') {
			playerIndex = 15;
		} else if (p === '4' || pp === '4') {
			playerIndex = 14;
		} else if (p === '5' || pp === '5') {
			playerIndex = 13;
		} else if (p === '6' || pp === '6') {
			playerIndex = 12;
		} else if (p === '7' || pp === '7') {
			playerIndex = 11;
		} else if (
			p === '8' ||
			pp === '8' ||
			p === '9' ||
			pp === '9' ||
			p === 'T' ||
			pp === 'T' ||
			p === 'J' ||
			pp === 'J' ||
			p === 'Q' ||
			pp === 'Q' ||
			p === 'K' ||
			pp === 'K'
		) {
			playerIndex = 10;
		}
	} else if (
		parseInt(p) + parseInt(pp) === 5 ||
		parseInt(p) + parseInt(pp) === 6 ||
		parseInt(p) + parseInt(pp) === 7 ||
		parseInt(p) + parseInt(pp) === 8
	) {
		playerIndex = 9;
	} else if (parseInt(p) + parseInt(pp) === 9) {
		playerIndex = 8;
	} else if (parseInt(p) + parseInt(pp) === 10) {
		playerIndex = 7;
	} else if (parseInt(p) + parseInt(pp) === 11) {
		playerIndex = 6;
	} else if (parseInt(p) + parseInt(pp) === 12) {
		playerIndex = 5;
	} else if (parseInt(p) + parseInt(pp) === 13) {
		playerIndex = 4;
	} else if (parseInt(p) + parseInt(pp) === 14) {
		playerIndex = 3;
	} else if (parseInt(p) + parseInt(pp) === 15) {
		playerIndex = 2;
	} else if (parseInt(p) + parseInt(pp) === 16) {
		playerIndex = 1;
	} else if (parseInt(p) + parseInt(pp) >= 17) {
		playerIndex = 0;
	}

	if (playerIndex === -1 || dealerIndex === -1) {
		return 'Error';
	}
	const answer = tableData[playerIndex][dealerIndex];
	if (answer === 'S') {
		return 'Stand';
	} else if (answer === 'H') {
		return 'Hit';
	} else if (answer === 'SP') {
		return 'Split';
	} else if (answer === 'D') {
		return 'Double Down';
	}
};

export const cardImages = {
	'2C': {
		alt: '2C',
		uri: require('../assets/cards/2C.png'),
	},
	'3C': {
		alt: '3C',
		uri: require('../assets/cards/3C.png'),
	},
	'4C': {
		alt: '4C',
		uri: require('../assets/cards/4C.png'),
	},
	'5C': {
		alt: '5C',
		uri: require('../assets/cards/5C.png'),
	},
	'6C': {
		alt: '6C',
		uri: require('../assets/cards/6C.png'),
	},
	'7C': {
		alt: '7C',
		uri: require('../assets/cards/7C.png'),
	},
	'8C': {
		alt: '8C',
		uri: require('../assets/cards/8C.png'),
	},
	'9C': {
		alt: '9C',
		uri: require('../assets/cards/9C.png'),
	},
	TC: {
		alt: 'TC',
		uri: require('../assets/cards/TC.png'),
	},
	JC: {
		alt: 'JC',
		uri: require('../assets/cards/JC.png'),
	},
	QC: {
		alt: 'QC',
		uri: require('../assets/cards/QC.png'),
	},
	KC: {
		alt: 'KC',
		uri: require('../assets/cards/KC.png'),
	},
	AC: {
		alt: 'AC',
		uri: require('../assets/cards/AC.png'),
	},

	'2D': {
		alt: '2D',
		uri: require('../assets/cards/2D.png'),
	},
	'3D': {
		alt: '3D',
		uri: require('../assets/cards/3D.png'),
	},
	'4D': {
		alt: '4D',
		uri: require('../assets/cards/4D.png'),
	},
	'5D': {
		alt: '5D',
		uri: require('../assets/cards/5D.png'),
	},
	'6D': {
		alt: '6D',
		uri: require('../assets/cards/6D.png'),
	},
	'7D': {
		alt: '7D',
		uri: require('../assets/cards/7D.png'),
	},
	'8D': {
		alt: '8D',
		uri: require('../assets/cards/8D.png'),
	},
	'9D': {
		alt: '9D',
		uri: require('../assets/cards/9D.png'),
	},
	TD: {
		alt: 'TD',
		uri: require('../assets/cards/TD.png'),
	},
	JD: {
		alt: 'JD',
		uri: require('../assets/cards/JD.png'),
	},
	QD: {
		alt: 'QD',
		uri: require('../assets/cards/QD.png'),
	},
	KD: {
		alt: 'KD',
		uri: require('../assets/cards/KD.png'),
	},
	AD: {
		alt: 'AD',
		uri: require('../assets/cards/AD.png'),
	},

	'2H': {
		alt: '2H',
		uri: require('../assets/cards/2H.png'),
	},
	'3H': {
		alt: '3H',
		uri: require('../assets/cards/3H.png'),
	},
	'4H': {
		alt: '4H',
		uri: require('../assets/cards/4H.png'),
	},
	'5H': {
		alt: '5H',
		uri: require('../assets/cards/5H.png'),
	},
	'6H': {
		alt: '6H',
		uri: require('../assets/cards/6H.png'),
	},
	'7H': {
		alt: '7H',
		uri: require('../assets/cards/7H.png'),
	},
	'8H': {
		alt: '8H',
		uri: require('../assets/cards/8H.png'),
	},
	'9H': {
		alt: '9H',
		uri: require('../assets/cards/9H.png'),
	},
	TH: {
		alt: 'TH',
		uri: require('../assets/cards/TH.png'),
	},
	JH: {
		alt: 'JH',
		uri: require('../assets/cards/JH.png'),
	},
	QH: {
		alt: 'QH',
		uri: require('../assets/cards/QH.png'),
	},
	KH: {
		alt: 'KH',
		uri: require('../assets/cards/KH.png'),
	},
	AH: {
		alt: 'AH',
		uri: require('../assets/cards/AH.png'),
	},

	'2S': {
		alt: '2S',
		uri: require('../assets/cards/2S.png'),
	},
	'3S': {
		alt: '3S',
		uri: require('../assets/cards/3S.png'),
	},
	'4S': {
		alt: '4S',
		uri: require('../assets/cards/4S.png'),
	},
	'5S': {
		alt: '5S',
		uri: require('../assets/cards/5S.png'),
	},
	'6S': {
		alt: '6S',
		uri: require('../assets/cards/6S.png'),
	},
	'7S': {
		alt: '7S',
		uri: require('../assets/cards/7S.png'),
	},
	'8S': {
		alt: '8S',
		uri: require('../assets/cards/8S.png'),
	},
	'9S': {
		alt: '9S',
		uri: require('../assets/cards/9S.png'),
	},
	TS: {
		alt: 'TS',
		uri: require('../assets/cards/TS.png'),
	},
	JS: {
		alt: 'JS',
		uri: require('../assets/cards/JS.png'),
	},
	QS: {
		alt: 'QS',
		uri: require('../assets/cards/QS.png'),
	},
	KS: {
		alt: 'KS',
		uri: require('../assets/cards/KS.png'),
	},
	AS: {
		alt: 'AS',
		uri: require('../assets/cards/AS.png'),
	},
};
