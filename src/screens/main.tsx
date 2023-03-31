import React from 'react';
import { Image, Text, useColorModeValue } from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';

export default function Main() {
	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('white', 'primary.900')}
			w='full'
		>
			<Navbar />
			<Text>Main</Text>

		</AnimatedColorBox>
	);
}
