import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
	Button,
	Fab,
	HStack,
	Image,
	Text,
	VStack,
	View,
	useColorModeValue,
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';
import {
	Card,
	createDeck,
	getAnswer,
	shuffle,
} from '../components/cardfunctions';
import BottomSheet, { BottomSheetRefProps } from '../components/bottom-sheet';
import QuickGuide from '../components/quick-guide';
import { Toast } from '../components/toast';

export default function BasicStrategy() {
	//bottom sheet
	const ref = useRef<BottomSheetRefProps>(null);
	const toggleChart = useCallback(() => {
		const isActive = ref?.current?.isActive();
		if (isActive) {
			ref?.current?.scrollTo(0);
		} else {
			ref?.current?.scrollTo(-200);
		}
	}, []);
	//bottom sheet

	//toast
	const [showAnimation, setShowAnimation] = useState(false);
	const nextHand = useCallback(() => {
		setShowAnimation(false);
		resetDeck();
		dealHands();
	}, []);
	const [isCorrect, setIsCorrect] = useState(true);
	//toast

	const [ndecks, setNDecks] = useState(1);
	const [deck, setDeck] = useState(shuffle(createDeck(ndecks)));
	const [playerHand, setPlayerHand] = useState<Card[]>([]);
	const [dealerHand, setDealerHand] = useState<Card[]>([]);
	//const [isDealerCardVisible, setIsDealerCardVisible] = useState(false);

	//const [p, setp] = useState<any>();

	const dealHands = () => {
		//treating end of array as top of deck
		const dealerHandTemp: Card[] = [];
		const playerHandTemp: Card[] = [];
		deck.pop(); //burn card
		playerHandTemp.push(deck.pop()!);
		dealerHandTemp.push(deck.pop()!); // needs to be facedown
		playerHandTemp.push(deck.pop()!);
		dealerHandTemp.push(deck.pop()!);

		setPlayerHand(playerHandTemp);
		//setp1(playerHandTemp[0].value + playerHandTemp[0].suit)
		setDealerHand(dealerHandTemp);
		//setp(`${playerHandTemp[0].value}${playerHandTemp[0].suit}`);

		return [dealerHandTemp, playerHandTemp];
	};

	useEffect(() => {
		dealHands();
	}, []);

	const resetDeck = useCallback(() => {
		setDeck(shuffle(createDeck(ndecks)));
	}, []);

	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('white', 'primary.900')}
			w='full'
			alignItems='center'
		>
			<Navbar />
			<Text fontSize='30'>Basic Strategy Trainer</Text>
			{showAnimation && <Toast correct={isCorrect} />}

			{playerHand.length > 0 ? (
				<>
					<VStack>
						<HStack mb='10' mt='10'>
							{getCardImage(
								`${dealerHand[0].value}${dealerHand[0].suit}`
							)}

							{getCardImage(
								`${dealerHand[1].value}${dealerHand[1].suit}`
							)}
						</HStack>
						<HStack>
							{getCardImage(
								`${playerHand[0].value}${playerHand[0].suit}`
							)}
							{getCardImage(
								`${playerHand[1].value}${playerHand[1].suit}`
							)}
						</HStack>
					</VStack>

					<Button
						onPress={() => {
							resetDeck();
							dealHands();
						}}
					>
						Deal
					</Button>

					<View
						flexDirection='row'
						flexWrap='wrap'
						justifyContent='center'
						alignContent='center'
						h='300'
						w='420'
						bg='black'
						borderRadius='25'
						padding='4'
					>
						<Button
							w='150'
							h='75'
							borderRadius='15'
							margin='4'
							onPress={() => {
								if (
									getAnswer(playerHand, dealerHand[1]) ===
									'Hit'
								) {
									//corrent
									setIsCorrect(true);
									setShowAnimation(true);
								} else {
									//incorrect
									setIsCorrect(false);
									setShowAnimation(true);
								}
							}}
						>
							<Text fontSize='20'>Hit</Text>
						</Button>
						<Button
							w='150'
							h='75'
							borderRadius='15'
							margin='4'
							onPress={() => {
								if (
									getAnswer(playerHand, dealerHand[1]) ===
									'Split'
								) {
									//corrent
									setIsCorrect(true);
									setShowAnimation(true);
								} else {
									//incorrect
									setIsCorrect(false);
									setShowAnimation(true);
								}
							}}
						>
							<Text fontSize='20'>Split</Text>
						</Button>
						<Button
							w='150'
							h='75'
							borderRadius='15'
							margin='4'
							onPress={() => {
								if (
									getAnswer(playerHand, dealerHand[1]) ===
									'Stand'
								) {
									//corrent
									setIsCorrect(true);
									setShowAnimation(true);
								} else {
									//incorrect
									setIsCorrect(false);
									setShowAnimation(true);
								}
							}}
						>
							<Text fontSize='20'>Stand</Text>
						</Button>
						<Button
							w='150'
							h='75'
							borderRadius='15'
							margin='4'
							onPress={() => {
								if (
									getAnswer(playerHand, dealerHand[1]) ===
									'Double Down'
								) {
									//corrent
									setIsCorrect(true);
									setShowAnimation(true);
								} else {
									//incorrect
									setIsCorrect(false);
									setShowAnimation(true);
								}
							}}
						>
							<Text fontSize='20'>Double Down</Text>
						</Button>
					</View>
					<Button>{getAnswer(playerHand, dealerHand[1])}</Button>
					<Button onPress={nextHand}>Next Hand</Button>
				</>
			) : null}
			<Fab label='CHART' onPress={toggleChart} renderInPortal={false} />
			<BottomSheet ref={ref}>
				<QuickGuide />
			</BottomSheet>
		</AnimatedColorBox>
	);
}

const getCardImage = (c: string) => {
	if (c === 'back') {
		return (
			<Image
				source={require('../assets/cards/RED_BACK.png')}
				alt={c}
				key={c}
				w='75'
				h='150'
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
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '3C':
				return (
					<Image
						source={require('../assets/cards/3C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '4C':
				return (
					<Image
						source={require('../assets/cards/4C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '5C':
				return (
					<Image
						source={require('../assets/cards/5C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '6C':
				return (
					<Image
						source={require('../assets/cards/6C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '7C':
				return (
					<Image
						source={require('../assets/cards/7C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '8C':
				return (
					<Image
						source={require('../assets/cards/8C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '9C':
				return (
					<Image
						source={require('../assets/cards/9C.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'TC':
				return (
					<Image
						source={require('../assets/cards/TC.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'JC':
				return (
					<Image
						source={require('../assets/cards/JC.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'QC':
				return (
					<Image
						source={require('../assets/cards/QC.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'KC':
				return (
					<Image
						source={require('../assets/cards/KC.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'AC':
				return (
					<Image
						source={require('../assets/cards/AC.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '2D':
				return (
					<Image
						source={require('../assets/cards/2D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '3D':
				return (
					<Image
						source={require('../assets/cards/3D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '4D':
				return (
					<Image
						source={require('../assets/cards/4D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '5D':
				return (
					<Image
						source={require('../assets/cards/5D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '6D':
				return (
					<Image
						source={require('../assets/cards/6D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '7D':
				return (
					<Image
						source={require('../assets/cards/7D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '8D':
				return (
					<Image
						source={require('../assets/cards/8D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '9D':
				return (
					<Image
						source={require('../assets/cards/9D.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'TD':
				return (
					<Image
						source={require('../assets/cards/TD.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'JD':
				return (
					<Image
						source={require('../assets/cards/JD.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'QD':
				return (
					<Image
						source={require('../assets/cards/QD.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'KD':
				return (
					<Image
						source={require('../assets/cards/KD.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'AD':
				return (
					<Image
						source={require('../assets/cards/AD.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '2H':
				return (
					<Image
						source={require('../assets/cards/2H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '3H':
				return (
					<Image
						source={require('../assets/cards/3H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '4H':
				return (
					<Image
						source={require('../assets/cards/4H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '5H':
				return (
					<Image
						source={require('../assets/cards/5H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '6H':
				return (
					<Image
						source={require('../assets/cards/6H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '7H':
				return (
					<Image
						source={require('../assets/cards/7H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '8H':
				return (
					<Image
						source={require('../assets/cards/8H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '9H':
				return (
					<Image
						source={require('../assets/cards/9H.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'TH':
				return (
					<Image
						source={require('../assets/cards/TH.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'JH':
				return (
					<Image
						source={require('../assets/cards/JH.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'QH':
				return (
					<Image
						source={require('../assets/cards/QH.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'KH':
				return (
					<Image
						source={require('../assets/cards/KH.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'AH':
				return (
					<Image
						source={require('../assets/cards/AH.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '2S':
				return (
					<Image
						source={require('../assets/cards/2S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);

			case '3S':
				return (
					<Image
						source={require('../assets/cards/3S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '4S':
				return (
					<Image
						source={require('../assets/cards/4S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '5S':
				return (
					<Image
						source={require('../assets/cards/5S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '6S':
				return (
					<Image
						source={require('../assets/cards/6S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '7S':
				return (
					<Image
						source={require('../assets/cards/7S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '8S':
				return (
					<Image
						source={require('../assets/cards/8S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case '9S':
				return (
					<Image
						source={require('../assets/cards/9S.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'TS':
				return (
					<Image
						source={require('../assets/cards/TS.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'JS':
				return (
					<Image
						source={require('../assets/cards/JS.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'QS':
				return (
					<Image
						source={require('../assets/cards/QS.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'KS':
				return (
					<Image
						source={require('../assets/cards/KS.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
			case 'AS':
				return (
					<Image
						source={require('../assets/cards/AS.png')}
						alt={c}
						key={c}
						w='75'
						h='150'
						resizeMode='center'
					/>
				);
		}
	}
};

/*
<Image
						w='75'
						h='150'
						resizeMode='center'
						source={
							cardImages[
								`${playerHand[0].value}${playerHand[0].suit}` as keyof typeof cardImages
							].uri
						}
						alt={
							cardImages[
								`${playerHand[0].value}${playerHand[0].suit}` as keyof typeof cardImages
							].alt
						}
					/>




const C2 = require('../assets/cards/2C.png');
const C3 = require('../assets/cards/3C.png');
const C4 = require('../assets/cards/4C.png');
const C5 = require('../assets/cards/5C.png');
const C6 = require('../assets/cards/6C.png');
const C7 = require('../assets/cards/7C.png');
const C8 = require('../assets/cards/8C.png');
const C9 = require('../assets/cards/9C.png');
const CT = require('../assets/cards/TC.png');
const CJ = require('../assets/cards/JC.png');
const CQ = require('../assets/cards/QC.png');
const CK = require('../assets/cards/KC.png');
const CA = require('../assets/cards/AC.png');

const D2 = require('../assets/cards/2D.png');
const D3 = require('../assets/cards/3D.png');
const D4 = require('../assets/cards/4D.png');
const D5 = require('../assets/cards/5D.png');
const D6 = require('../assets/cards/6D.png');
const D7 = require('../assets/cards/7D.png');
const D8 = require('../assets/cards/8D.png');
const D9 = require('../assets/cards/9D.png');
const DT = require('../assets/cards/TD.png');
const DJ = require('../assets/cards/JD.png');
const DQ = require('../assets/cards/QD.png');
const DK = require('../assets/cards/KD.png');
const DA = require('../assets/cards/AD.png');

const H2 = require('../assets/cards/2H.png');
const H3 = require('../assets/cards/3H.png');
const H4 = require('../assets/cards/4H.png');
const H5 = require('../assets/cards/5H.png');
const H6 = require('../assets/cards/6H.png');
const H7 = require('../assets/cards/7H.png');
const H8 = require('../assets/cards/8H.png');
const H9 = require('../assets/cards/9H.png');
const HT = require('../assets/cards/TH.png');
const HJ = require('../assets/cards/JH.png');
const HQ = require('../assets/cards/QH.png');
const HK = require('../assets/cards/KH.png');
const HA = require('../assets/cards/AH.png');

const S2 = require('../assets/cards/2S.png');
const S3 = require('../assets/cards/3S.png');
const S4 = require('../assets/cards/4S.png');
const S5 = require('../assets/cards/5S.png');
const S6 = require('../assets/cards/6S.png');
const S7 = require('../assets/cards/7S.png');
const S8 = require('../assets/cards/8S.png');
const S9 = require('../assets/cards/9S.png');
const ST = require('../assets/cards/TS.png');
const SJ = require('../assets/cards/JS.png');
const SQ = require('../assets/cards/QS.png');
const SK = require('../assets/cards/KS.png');
const SA = require('../assets/cards/AS.png');

const cardImages = {
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
*/
