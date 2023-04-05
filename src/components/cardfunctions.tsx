import { Image } from 'native-base';
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

export const getAnswer = (ph: Card[], dh: Card) => {
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

export const getCardImage = (props: { h: string; w: string }, c: string) => {
	// DOES NOT CHANGE IMAGES UNLESS KEY IS INCLUDED
	if (c === 'back') {
		return (
			<Image
				source={require('../assets/cards/RED_BACK.png')}
				alt={c}
				key={c}
				{...props}
				resizeMode='center'
			/>
		);
	} else {
		switch (c) {
			case '2C':
				return (
					<Image
						source={require('../assets/cards/2C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '3C':
				return (
					<Image
						source={require('../assets/cards/3C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '4C':
				return (
					<Image
						source={require('../assets/cards/4C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '5C':
				return (
					<Image
						source={require('../assets/cards/5C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '6C':
				return (
					<Image
						source={require('../assets/cards/6C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '7C':
				return (
					<Image
						source={require('../assets/cards/7C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '8C':
				return (
					<Image
						source={require('../assets/cards/8C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '9C':
				return (
					<Image
						source={require('../assets/cards/9C.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'TC':
				return (
					<Image
						source={require('../assets/cards/TC.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'JC':
				return (
					<Image
						source={require('../assets/cards/JC.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'QC':
				return (
					<Image
						source={require('../assets/cards/QC.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'KC':
				return (
					<Image
						source={require('../assets/cards/KC.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'AC':
				return (
					<Image
						source={require('../assets/cards/AC.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '2D':
				return (
					<Image
						source={require('../assets/cards/2D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '3D':
				return (
					<Image
						source={require('../assets/cards/3D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '4D':
				return (
					<Image
						source={require('../assets/cards/4D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '5D':
				return (
					<Image
						source={require('../assets/cards/5D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '6D':
				return (
					<Image
						source={require('../assets/cards/6D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '7D':
				return (
					<Image
						source={require('../assets/cards/7D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '8D':
				return (
					<Image
						source={require('../assets/cards/8D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '9D':
				return (
					<Image
						source={require('../assets/cards/9D.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'TD':
				return (
					<Image
						source={require('../assets/cards/TD.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'JD':
				return (
					<Image
						source={require('../assets/cards/JD.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'QD':
				return (
					<Image
						source={require('../assets/cards/QD.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'KD':
				return (
					<Image
						source={require('../assets/cards/KD.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'AD':
				return (
					<Image
						source={require('../assets/cards/AD.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '2H':
				return (
					<Image
						source={require('../assets/cards/2H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '3H':
				return (
					<Image
						source={require('../assets/cards/3H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '4H':
				return (
					<Image
						source={require('../assets/cards/4H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '5H':
				return (
					<Image
						source={require('../assets/cards/5H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '6H':
				return (
					<Image
						source={require('../assets/cards/6H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '7H':
				return (
					<Image
						source={require('../assets/cards/7H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '8H':
				return (
					<Image
						source={require('../assets/cards/8H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '9H':
				return (
					<Image
						source={require('../assets/cards/9H.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'TH':
				return (
					<Image
						source={require('../assets/cards/TH.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'JH':
				return (
					<Image
						source={require('../assets/cards/JH.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'QH':
				return (
					<Image
						source={require('../assets/cards/QH.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'KH':
				return (
					<Image
						source={require('../assets/cards/KH.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'AH':
				return (
					<Image
						source={require('../assets/cards/AH.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '2S':
				return (
					<Image
						source={require('../assets/cards/2S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);

			case '3S':
				return (
					<Image
						source={require('../assets/cards/3S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '4S':
				return (
					<Image
						source={require('../assets/cards/4S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '5S':
				return (
					<Image
						source={require('../assets/cards/5S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '6S':
				return (
					<Image
						source={require('../assets/cards/6S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '7S':
				return (
					<Image
						source={require('../assets/cards/7S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '8S':
				return (
					<Image
						source={require('../assets/cards/8S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case '9S':
				return (
					<Image
						source={require('../assets/cards/9S.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'TS':
				return (
					<Image
						source={require('../assets/cards/TS.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'JS':
				return (
					<Image
						source={require('../assets/cards/JS.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'QS':
				return (
					<Image
						source={require('../assets/cards/QS.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'KS':
				return (
					<Image
						source={require('../assets/cards/KS.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
			case 'AS':
				return (
					<Image
						source={require('../assets/cards/AS.png')}
						alt={c}
						key={c}
						{...props}
						resizeMode='center'
					/>
				);
		}
	}
};
