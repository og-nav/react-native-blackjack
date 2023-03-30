import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'native-base';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

export const Toast = ({ correct }: { correct: boolean }) => {
	return (
		<>
			{correct ? (
				<Animated.View
					entering={FadeInUp}
					exiting={FadeOutUp}
					style={[
						styles.toastContainer,
						styles.successToastContainer,
					]}
				>
					<Image
						source={require('../assets/success.png')}
						alt='Success Toast'
						style={styles.toastIcon}
					/>
					<Text style={[styles.toastText, styles.successToastText]}>
						Correct!
					</Text>
				</Animated.View>
			) : (
				<Animated.View
					entering={FadeInUp}
					exiting={FadeOutUp}
					style={[styles.toastContainer, styles.errorToastContainer]}
				>
					<Image
						source={require('../assets/error.png')}
						alt='Error Toast'
						style={styles.toastIcon}
					/>
					<Text style={[styles.toastText, styles.errorToastText]}>
						Wrong!
					</Text>
				</Animated.View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		top: 70,
		width: '90%',
		padding: 10,
		borderRadius: 18,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
	},
	toastText: {
		marginLeft: 14,
		fontSize: 16,
	},
	toastIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	successToastContainer: {
		backgroundColor: '#DEF1D7',
		borderColor: '#1F8722',
	},
	errorToastContainer: {
		backgroundColor: '#FAE1DB',
		borderColor: '#D9100A',
	},
	successToastText: {
		color: '#1F8722',
	},
	errorToastText: {
		color: '#D9100A',
	},
});
