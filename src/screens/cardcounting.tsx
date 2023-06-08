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
	createDeck,
	shuffle,
	getCardImage,
	CardType,
	getRunningCounts,
} from '../components/cardfunctions';

import Animated, {
	Easing,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
const defaultImageSize = { h: '150', w: '75' };

export default function CardCounting() {
	const returnToDeck = useSharedValue(false);
	const [speed, setSpeed] = useState(1);
	const [nDecks, setNDecks] = useState(1);
	const [deck, setDeck] = useState<CardType[]>(shuffle(createDeck(nDecks)));
	const [runningCounts, setRunningCounts] = useState(getRunningCounts(deck));
	const [runningCount, setRunningCount] = useState(0);
	const [shouldDealCards, setShouldDealCards] = useState(false);

	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('white', 'primary.900')}
			w='full'
			alignItems='center'
		>
			<Navbar />
			<Text>Adjust Speed</Text>

			<View {...styles.container}>
				{deck.map((card, index) => (
					<CountingCard
						card={{
							source: getCardImage(card.value + card.suit),
							alt: card.value + card.suit,
						}}
						index={index}
						deckLength={deck.length}
						dealCard={shouldDealCards}
						returnToDeck={returnToDeck}
						key={
							card.value +
							card.suit +
							(deck.length % index).toString()
						}
					/>
				))}
				<CountingCard
					card={{
						source: getCardImage('back'),
						alt: 'back',
					}}
					index={deck.length}
					deckLength={deck.length}
					dealCard={shouldDealCards}
					returnToDeck={returnToDeck}
					key={'back'}
				/>
			</View>
			<Button onPress={() => setShouldDealCards(true)}>GO!</Button>
			<Button
				onPress={() =>
					setShouldDealCards((prev) => {
						return !prev;
					})
				}
			>
				STOP
			</Button>
			<Button
				onPress={() => {
					returnToDeck.value = true;
					setShouldDealCards(false);
				}}
			>
				return
			</Button>
		</AnimatedColorBox>
	);
}

const styles = {
	container: {
		w: '300',
		h: '400',
		bg: 'black',
		borderRadius: 10,
		justifyContent: 'center',
	},
};

interface CardProps {
	card: {
		source: ReturnType<typeof require>;
		alt: string;
	};
	returnToDeck: Animated.SharedValue<boolean>;
	deckLength: number;
	dealCard: boolean;
	//dealSpeed: number
	//
	index: number;
}

const duration = 100;
const cardHeight = 150;
const cardWidth = 75;

const CountingCard = ({
	card: { source, alt },
	returnToDeck,
	deckLength,
	dealCard,
	index,
}: CardProps) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const delay = (deckLength - index + 1) * duration; //+1 to account for back face card at the front

	useEffect(() => {
		if (dealCard) {
			translateX.value = withDelay(
				delay,
				withTiming(250, {
					duration: duration,
					easing: Easing.inOut(Easing.ease),
				})
			);
		}
	}, [delay, index, translateX, dealCard]);

	useAnimatedReaction(
		() => returnToDeck.value,
		(v) => {
			if (v) {
				const d = 30 * index;
				translateX.value = withDelay(
					d,
					withSpring(0, {}, () => {
						returnToDeck.value = false;
					})
				);
			}
		}
	);

	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	return (
		<Animated.View style={[style]}>
			<Image
				source={source}
				alt={alt}
				resizeMode='contain'
				{...defaultImageSize}
				position='absolute'
			/>
		</Animated.View>
	);
};
