import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Image, Button, Text } from 'native-base';
import Animated, {
	Easing,
	interpolate,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const cardHeight = 150;
const cardWidth = 75;
const duration = 250;
const locations = [
	{ x: -20, y: 325 },
	{ x: -20, y: 200 },
	{ x: 20, y: 325 },
	{ x: 20, y: 200 },
];


interface CardProps {
	cardFront: {
		cfsource: ReturnType<typeof require>;
		cfalt: string;
	};
	cardBack: {
		cbsource: ReturnType<typeof require>;
		cbalt: string;
	};
	returnToDeck: Animated.SharedValue<boolean>;
	deckLength: number;
	index: number;
}

export const Card = ({
	cardFront: { cfsource, cfalt },
	cardBack: { cbsource, cbalt },
	returnToDeck,
	deckLength,
	index,
}: CardProps) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const rotateZ = useSharedValue(0);
	const delay = 1000 + (deckLength - index) * duration;
	const theta = -5 + Math.random() * 10;
	const flipDuration = 500;

	useEffect(() => {
		translateY.value = withDelay(
			delay,
			withTiming(locations[index].y, {
				duration: duration,
				easing: Easing.inOut(Easing.ease),
			})
		);
		translateX.value = withDelay(
			delay,
			withTiming(locations[index].x, {
				duration: duration,
				easing: Easing.inOut(Easing.ease),
			})
		);
	}, [delay, index, theta, translateY]);

	useAnimatedReaction(
		() => returnToDeck.value,
		(v) => {
			if (v) {
				const d = 150 * index;
				translateX.value = withDelay(
					d,
					withSpring(300, {}, () => {
						returnToDeck.value = false;
					})
				);
				returnToDeck.value = false;
				
			}
		}
	);

	const style = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ rotateZ: `${rotateZ.value}deg` },
		],
	}));

	const spin = useSharedValue(0);

	const rStyle = useAnimatedStyle(() => {
		const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
		return {
			transform: [
				{
					rotateY: withTiming(`${spinVal}deg`, {
						duration: flipDuration,
					}),
				},
			],
		};
	}, []);

	const bStyle = useAnimatedStyle(() => {
		const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
		return {
			transform: [
				{ rotateY: withTiming(`${spinVal}deg`, { duration: 500 }) },
			],
		};
	}, []);

	return (
		<Animated.View style={[styles.card, style]}>
			<Image
				source={cfsource}
				style={{
					width: cardWidth,
					height: cardHeight,
				}}
				key={index}
				alt={cfalt}
				resizeMode='contain'
			/>
			
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		borderRadius: 10,
		width: cardWidth,
		height: cardHeight,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	front: {
		backfaceVisibility: 'hidden',
	},
	back: {
		backfaceVisibility: 'hidden',
	},
});

export default Card;
/*
	<View style={styles.container} pointerEvents='box-none'>
			<Animated.View style={[styles.front, rStyle]}>
				<Animated.View style={[styles.card, style]}>
					<Image
						source={cbsource}
						style={{
							width: cardWidth,
							height: cardHeight,
						
						}}
						key={index}
						alt={cbalt}
						resizeMode='contain'
					/>
				</Animated.View>
			</Animated.View>
			<Animated.View style={[styles.back, bStyle]}>
				<Animated.View style={[styles.card, style]}>
					<Image
						source={cfsource}
						style={{
							width: cardWidth,
							height: cardHeight,
							
						}}
						key={index}
						alt={cfalt}
						resizeMode='contain'
					/>
				</Animated.View>
			</Animated.View>
			
		</View>




*/
