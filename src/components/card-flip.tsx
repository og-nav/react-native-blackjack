import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'native-base';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface cProps {
	source: ReturnType<typeof require>;
	alt: string;
}

const CardFlip = ({
	cf,
	cb,
	spin,
}: {
	cf: cProps;
	cb: cProps;
	spin: Animated.SharedValue<number>;
}) => {
	//const spin = useSharedValue(0);

	const rStyle = useAnimatedStyle(() => {
		const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
		return {
			transform: [
				{ rotateY: withTiming(`${spinVal}deg`, { duration: 500 }) },
			],
		};
	}, []);

	const bStyle = useAnimatedStyle(() => {
		const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
		return {
			transform: [
				{
					rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
				},
			],
		};
	}, []);

	return (
		<View style={styles.container}>
			<View>
				<Animated.View style={[styles.front, rStyle]}>
					<Image
						source={cf.source}
						alt={cf.alt}
						key={cf.alt}
						resizeMode='contain'
					/>
				</Animated.View>
				<Animated.View style={[styles.back, bStyle]}>
					<Image
						source={cb.source}
						alt={cb.alt}
						key={cb.alt}
						resizeMode='contain'
					/>
				</Animated.View>
			</View>
			<Pressable
				onPress={() => (spin.value = spin.value ? 0 : 1)}
				style={{ marginTop: 30, alignItems: 'center' }}
			>
				<Text>FLIP</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 150,
		width: 100,
	},
	front: {
		height: 120,
		width: 60,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backfaceVisibility: 'hidden',
	},
	back: {
		height: 120,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backfaceVisibility: 'hidden',
	},
});
export default CardFlip;
