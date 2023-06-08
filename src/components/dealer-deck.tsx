import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'native-base';
import { CardType, getCardImage } from './cardfunctions';
import Card from './card';
import Animated, { useSharedValue } from 'react-native-reanimated';

const DummyCard = ({ card: { source, alt } }: ReturnType<typeof require>) => {
	const theta = -5 + Math.random() * 10;
	const style = {
		height: 150,
		width: 75,
		transform: [{ rotate: `${theta}deg` }],
	};
	return (
		<Image
			source={source}
			alt={alt}
			style={style}
			position='absolute'
			resizeMode='contain'
		/>
	);
};

const DealerDeck = ({ totalHand, returnToDeck }: { totalHand: CardType[], returnToDeck: Animated.SharedValue<boolean> }) => {
	//maybe add top of deck cards here
	
	return (
		<View style={styles.container}>
			{cards.map((card, index) => (
				<DummyCard card={card} key={index} />
			))}
			{totalHand.map((card, index) => (
				<Card
					cardFront={{
						cfsource: getCardImage(card.value + card.suit),
						cfalt: card.value + card.suit,
					}}
					cardBack={{
						cbsource: getCardImage('back'),
						cbalt: card.value + card.suit + 'back',
					}}
					returnToDeck={returnToDeck}
					deckLength={totalHand.length}
					index={index}
					key={card.value + card.suit}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//backgroundColor: 'lightblue',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 130,
	},
});

const cards = [
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
	{
		source: require('../assets/cards/RED_BACK.png'),
		alt: 'card back',
	},
];

export default DealerDeck;
