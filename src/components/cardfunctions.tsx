import { Image } from 'native-base';
var _ = require('lodash');
const suits = ['C', 'D', 'H', 'S'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];

export type CardType = {
	value: string | number;
	suit: string;
};

export const createDeck = (n: number) => {
	const deck: CardType[] = [];

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

export const shuffle = (deck: CardType[]) => {
	return _.shuffle(deck);
};

const tableHead = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

const tableData = [
	['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
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
	K: 10,
};

export const getAnswer = (ph: CardType[], dh: CardType) => {
	let dealerIndex = -1;
	const dv = dh.value.toString();
	if (dv in d) {
		dealerIndex = 8;
	} else if (dv === 'A') {
		dealerIndex = 9;
	} else {
		dealerIndex = tableHead.indexOf(dv);
	}

	let pv = ph[0].value.toString();
	let ppv = ph[1].value.toString();
	let playerIndex = -1;
	if (pv === ppv) {
		if (pv === '2') {
			playerIndex = 25;
		} else if (pv === '3') {
			playerIndex = 24;
		} else if (pv === '4') {
			playerIndex = 23;
		} else if (pv === '5') {
			playerIndex = 22;
		} else if (pv === '6') {
			playerIndex = 21;
		} else if (pv === '7') {
			playerIndex = 20;
		} else if (pv === '9') {
			playerIndex = 19;
		} else if (pv in d) {
			playerIndex = 18;
		} else if (pv === '8' || pv === 'A') {
			playerIndex = 17;
		}
	} else if (pv === 'A' || ppv === 'A') {
		if (pv === '2' || ppv === '2') {
			playerIndex = 16;
		} else if (pv === '3' || ppv === '3') {
			playerIndex = 15;
		} else if (pv === '4' || ppv === '4') {
			playerIndex = 14;
		} else if (pv === '5' || ppv === '5') {
			playerIndex = 13;
		} else if (pv === '6' || ppv === '6') {
			playerIndex = 12;
		} else if (pv === '7' || ppv === '7') {
			playerIndex = 11;
		} else if (
			pv === '8' ||
			ppv === '8' ||
			pv === '9' ||
			ppv === '9' ||
			pv in d ||
			ppv in d
		) {
			playerIndex = 10;
		}
	} else {
		let p = 0;
		let pp = 0;
		if (pv in d) {
			p = 10;
		} else {
			p = parseInt(pv);
		}
		if (ppv in d) {
			pp = 10;
		} else {
			pp = parseInt(ppv);
		}
		let ppp = p + pp;
		if (ppp === 5 || ppp === 6 || ppp === 7 || ppp === 8) {
			playerIndex = 9;
		} else if (ppp === 9) {
			playerIndex = 8;
		} else if (ppp === 10) {
			playerIndex = 7;
		} else if (ppp === 11) {
			playerIndex = 6;
		} else if (ppp === 12) {
			playerIndex = 5;
		} else if (ppp === 13) {
			playerIndex = 4;
		} else if (ppp === 14) {
			playerIndex = 3;
		} else if (ppp === 15) {
			playerIndex = 2;
		} else if (ppp === 16) {
			playerIndex = 1;
		} else if (ppp >= 17) {
			playerIndex = 0;
		}
	}
	if (playerIndex === -1 || dealerIndex === -1) {
		return pv + ',' + ppv;
	}

	let res = tableData[playerIndex][dealerIndex];
	if (res === 'S') {
		return 'Stand';
	} else if (res === 'H') {
		return 'Hit';
	} else if (res === 'SP') {
		return 'Split';
	} else if (res === 'D') {
		return 'Double Down';
	} else return '';

	//return dealerIndex;
};

const rc = {
	2: 1,
	3: 1,
	4: 1,
	5: 1,
	6: 1,
	7: 0,
	8: 0,
	9: 0,
	T: -1,
	J: -1,
	Q: -1,
	K: -1,
	A: -1,
	

}
export const getRunningCounts = (deck: CardType[]) => {
	const res: number[] = []
	res[0] = rc[deck[0].value as keyof typeof rc]
	for (let i = 1; i < deck.length; i++) {
		res[i] = res[i - 1] + rc[deck[i].value as keyof typeof rc]
	}
	return res
}


export const getCardImage = (c: string) => {
	// DOES NOT CHANGE IMAGES UNLESS KEY IS INCLUDED
	if (c === 'back') {
		return require('../assets/cards/RED_BACK.png');
	} else {
		switch (c) {
			case '2C':
				return require('../assets/cards/2C.png');

			case '3C':
				return require('../assets/cards/3C.png');
			case '4C':
				return require('../assets/cards/4C.png');
			case '5C':
				return require('../assets/cards/5C.png');
			case '6C':
				return require('../assets/cards/6C.png');
			case '7C':
				return require('../assets/cards/7C.png');
			case '8C':
				return require('../assets/cards/8C.png');
			case '9C':
				return require('../assets/cards/9C.png');
			case 'TC':
				return require('../assets/cards/TC.png');
			case 'JC':
				return require('../assets/cards/JC.png');
			case 'QC':
				return require('../assets/cards/QC.png');
			case 'KC':
				return require('../assets/cards/KC.png');
			case 'AC':
				return require('../assets/cards/AC.png');

			case '2D':
				return require('../assets/cards/2D.png');

			case '3D':
				return require('../assets/cards/3D.png');
			case '4D':
				return require('../assets/cards/4D.png');
			case '5D':
				return require('../assets/cards/5D.png');
			case '6D':
				return require('../assets/cards/6D.png');
			case '7D':
				return require('../assets/cards/7D.png');
			case '8D':
				return require('../assets/cards/8D.png');
			case '9D':
				return require('../assets/cards/9D.png');
			case 'TD':
				return require('../assets/cards/TD.png');
			case 'JD':
				return require('../assets/cards/JD.png');
			case 'QD':
				return require('../assets/cards/QD.png');
			case 'KD':
				return require('../assets/cards/KD.png');
			case 'AD':
				return require('../assets/cards/AD.png');

			case '2H':
				return require('../assets/cards/2H.png');

			case '3H':
				return require('../assets/cards/3H.png');
			case '4H':
				return require('../assets/cards/4H.png');
			case '5H':
				return require('../assets/cards/5H.png');
			case '6H':
				return require('../assets/cards/6H.png');
			case '7H':
				return require('../assets/cards/7H.png');
			case '8H':
				return require('../assets/cards/8H.png');
			case '9H':
				return require('../assets/cards/9H.png');
			case 'TH':
				return require('../assets/cards/TH.png');
			case 'JH':
				return require('../assets/cards/JH.png');
			case 'QH':
				return require('../assets/cards/QH.png');
			case 'KH':
				return require('../assets/cards/KH.png');
			case 'AH':
				return require('../assets/cards/AH.png');

			case '2S':
				return require('../assets/cards/2S.png');

			case '3S':
				return require('../assets/cards/3S.png');
			case '4S':
				return require('../assets/cards/4S.png');
			case '5S':
				return require('../assets/cards/5S.png');
			case '6S':
				return require('../assets/cards/6S.png');
			case '7S':
				return require('../assets/cards/7S.png');
			case '8S':
				return require('../assets/cards/8S.png');
			case '9S':
				return require('../assets/cards/9S.png');
			case 'TS':
				return require('../assets/cards/TS.png');
			case 'JS':
				return require('../assets/cards/JS.png');
			case 'QS':
				return require('../assets/cards/QS.png');
			case 'KS':
				return require('../assets/cards/KS.png');
			case 'AS':
				return require('../assets/cards/AS.png');
		}
	}
};
