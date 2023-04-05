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
	getCardImage,
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
	const [isCorrect, setIsCorrect] = useState(true);
	const nextHand = useCallback(() => {
		//setShowAnimation(false);
		resetDeck();
		dealHands();
	}, []);
	useEffect(() => {
		if (showAnimation === true) {
			const timeout = setTimeout(() => {
				if (isCorrect) {
					nextHand()
				}
				setShowAnimation(false);
			}, 1750);
			return () => clearTimeout(timeout);
		}
	}, [showAnimation]);
	//toast

	const [ndecks, _setNDecks] = useState(1);
	const [deck, setDeck] = useState(shuffle(createDeck(ndecks)));
	const [playerHand, setPlayerHand] = useState<Card[]>([]);
	const [dealerHand, setDealerHand] = useState<Card[]>([]);
	const [answer, setAnswer] = useState('');
	const defaultImageSize = { h: '150', w: '75' };

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
		setDealerHand(dealerHandTemp);
		setAnswer(getAnswer(playerHandTemp, dealerHandTemp[0]));

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
			{showAnimation && <Toast isCorrect={isCorrect} />}

			{playerHand.length > 0 ? (
				<>
					<VStack>
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
								if (answer === 'Hit') {
									//correct
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
								if (answer === 'Split') {
									//correct
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
								if (answer === 'Stand') {
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
								if (answer === 'Double Down') {
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
					<Button>{answer}</Button>
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
