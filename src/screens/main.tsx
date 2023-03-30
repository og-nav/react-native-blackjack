import React from 'react';
import { Image, Text, useColorModeValue } from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';

const c = require('../assets/cards/2C.png');

export default function Main() {
	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('white', 'primary.900')}
			w='full'
		>
			<Navbar />
			<Text>Main</Text>
			<Image source={c} alt='c' />
		</AnimatedColorBox>
	);
}
