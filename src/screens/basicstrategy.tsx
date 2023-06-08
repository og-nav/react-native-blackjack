import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
	Button,
	Fab,
	HStack,
	Text,
	VStack,
	View,
	useColorModeValue,
} from 'native-base';
import { useSharedValue } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';
import {
	CardType,
	createDeck,
	getAnswer,
	shuffle,
	getCardImage,
} from '../components/cardfunctions';
import BottomSheet, { BottomSheetRefProps } from '../components/bottom-sheet';
import QuickGuide from '../components/quick-guide';
import { Toast } from '../components/toast';
import DealerDeck from '../components/dealer-deck';
import CardFlip from '../components/card-flip';
import Card from '../components/card';

const { width, height } = Dimensions.get('window');

export default function BasicStrategy() {
	const returnToDeck = useSharedValue(false);

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
	const [isCorrect, setIsCorrect] = useState(true);
	const nextHand = useCallback(() => {
		resetDeck();
		dealHands();
	}, []);
	useEffect(() => {
		if (showAnimation === true) {
			const timeout = setTimeout(() => {
				if (isCorrect) {
					nextHand();
				}
				setShowAnimation(false);
			}, 1750);
			return () => clearTimeout(timeout);
		}
	}, [showAnimation]);
	//toast

	

	const [deck, setDeck] = useState<CardType[]>(shuffle(createDeck(1)));
	const [playerHand, setPlayerHand] = useState<CardType[]>([]);
	const [dealerHand, setDealerHand] = useState<CardType[]>([]);
	const [totalHand, setTotalHand] = useState<CardType[]>([]);
	const [answer, setAnswer] = useState('');
	const defaultImageSize = { h: '150', w: '75' };

	const dealHands = () => {
		//treating end of array as top of deck
		const dealerHandTemp: CardType[] = [];
		const playerHandTemp: CardType[] = [];
		const totalHandTemp: CardType[] = [];
		deck.pop(); //burn card
		playerHandTemp.push(deck.pop()!);
		dealerHandTemp.push(deck.pop()!); // needs to be facedown
		playerHandTemp.push(deck.pop()!);
		dealerHandTemp.push(deck.pop()!);

		totalHandTemp.push(playerHandTemp[0]);
		totalHandTemp.push(dealerHandTemp[0]);
		totalHandTemp.push(playerHandTemp[1]);
		totalHandTemp.push(dealerHandTemp[1]);

		setPlayerHand(playerHandTemp);
		setDealerHand(dealerHandTemp);
		setTotalHand(totalHandTemp);
		setAnswer(getAnswer(playerHandTemp, dealerHandTemp[0]));

		return [dealerHandTemp, playerHandTemp];
	};

	useEffect(() => {
		dealHands();
	}, []);

	const resetDeck = useCallback(() => {
		setDeck(shuffle(createDeck(1)));
	}, []);

	const handleHit = useCallback(() => {
		if (showAnimation) {
			return;
		}
		if (answer === 'Hit') {
			//correct

			setIsCorrect(true);
			setShowAnimation(true);
		} else {
			//incorrect
			setIsCorrect(false);
			setShowAnimation(true);
		}
	}, [answer, showAnimation]);

	const handleSplit = useCallback(() => {
		if (showAnimation) {
			return;
		}
		if (answer === 'Split') {
			//correct
			setIsCorrect(true);
			setShowAnimation(true);
		} else {
			//incorrect
			setIsCorrect(false);
			setShowAnimation(true);
		}
	}, [answer, showAnimation]);

	const handleStand = useCallback(() => {
		if (showAnimation) {
			return;
		}
		if (answer === 'Stand') {
			//correct
			setIsCorrect(true);
			setShowAnimation(true);
		} else {
			//incorrect
			setIsCorrect(false);
			setShowAnimation(true);
		}
	}, [answer, showAnimation]);

	const handleDoubleDown = useCallback(() => {
		if (showAnimation) {
			return;
		}
		if (answer === 'Double Down') {
			//correct
			setIsCorrect(true);
			setShowAnimation(true);
		} else {
			//incorrect
			setIsCorrect(false);
			setShowAnimation(true);
		}
	}, [answer, showAnimation]);

	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('white', 'primary.900')}
			w='full'
			alignItems='center'
		>
			<Navbar />
			{showAnimation && <Toast isCorrect={isCorrect} />}

			{playerHand.length > 0 ? (
				<>
					<View {...styles.table}>
						<DealerDeck
							totalHand={totalHand}
							returnToDeck={returnToDeck}
						/>
					</View>
					<Text>
						{playerHand[0].value + playerHand[0].suit}
						{playerHand[1].value + playerHand[1].suit}

						{dealerHand[0].value + dealerHand[0].suit}
						{dealerHand[1].value + dealerHand[1].suit}
					</Text>

					<View
						flexDirection='row'
						flexWrap='wrap'
						{...styles.answers}
					>
						<Button {...styles.button} onPress={handleHit}>
							<Text fontSize='20'>Hit</Text>
						</Button>
						<Button {...styles.button} onPress={handleSplit}>
							<Text fontSize='20'>Split</Text>
						</Button>
						<Button {...styles.button} onPress={handleStand}>
							<Text fontSize='20'>Stand</Text>
						</Button>
						<Button {...styles.button} onPress={handleDoubleDown}>
							<Text fontSize='20'>Double Down</Text>
						</Button>
					</View>
					<Button>{answer}</Button>
				</>
			) : null}
			<Fab label='CHART' onPress={toggleChart} renderInPortal={false} />
			<BottomSheet ref={ref}>
				<QuickGuide />
			</BottomSheet>
		</AnimatedColorBox>
	);
}

const styles = {
	table: {
		bg: '#35654D',
		h: (height * 4.5) / 8,
		w: (width * 7) / 8,
		alignItems: 'center',
		//justifyContent: 'flex-start',
		//alignContent: 'center',

		margin: 3,
		borderRadius: 15,
	},
	button: {
		w: '100',
		h: '75',
		borderRadius: '15',
		margin: '4',
	},
	answers: {
		//flexDirection: 'row',
		//flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center',
		h: '200',
		w: '320',
		borderRadius: '25',
		padding: '4',
		bg: 'black',
	},
};

const testcards = [
	{
		cfSource: require('../assets/cards/2C.png'),
		cfAlt: '2C',
		cbSource: require('../assets/cards/RED_BACK.png'),
		cbAlt: 'back',
	},
];

/*
<HStack mb='10' mt='10'>
								{getCardImage(
									defaultImageSize,
									`${dealerHand[0].value}${dealerHand[0].suit}`
								)}
								{getCardImage(defaultImageSize, 'back')}
							</HStack>
							<HStack>
								{getCardImage(
									defaultImageSize,
									`${playerHand[0].value}${playerHand[0].suit}`
								)}
								{getCardImage(
									defaultImageSize,
									`${playerHand[1].value}${playerHand[1].suit}`
								)}
							</HStack>

<CardFlip
							cf={{
								source: require('../assets/cards/2C.png'),
								alt: '2C',
							}}
							cb={{
								source: require('../assets/cards/RED_BACK.png'),
								alt: 'back',
							}}
						/>


						{deck.slice(0, 4).map((card, index) => (
							<Card
								cardFront={{
									cfsource: getCardImage(
										card.value + card.suit
									),
									cfalt: card.value + card.suit + 'front',
								}}
								cardBack={{
									cbsource: getCardImage('back'),
									cbalt: card.value + card.suit + 'back',
								}}
								returnToDeck={returnToDeck}
								index={index}
								key={index}
							/>
						))}
*/
