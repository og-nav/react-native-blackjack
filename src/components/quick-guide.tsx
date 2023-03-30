import React from 'react';
import { Image, View, Text, HStack, VStack } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const QuickGuide = () => {
	const { height, width } = Dimensions.get('window');
	const tableHead = ['', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'A'];
	const tableTitle = [
		'17+',
		16,
		15,
		14,
		13,
		12,
		11,
		10,
		9,
		'5-8',
		'A, 8-10',
		'A, 7',
		'A, 6',
		'A, 5',
		'A, 4',
		'A, 3',
		'A, 2',
		'A, A, 8, 8',
		'10, 10,',
		'9, 9',
		'7, 7',
		'6, 6',
		'5, 5',
		'4, 4',
		'3, 3',
		'2, 2',
	];

	const tableData = [
		['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
		['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'],
		['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
		['D', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
		['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		['S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'],
		['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
		['SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'SP'],
		['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		['SP', 'SP', 'SP', 'SP', 'SP', 'S', 'SP', 'SP', 'S', 'S'],
		['SP', 'SP', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
		['H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H', 'H'],
		['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
		['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
		['H', 'H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
		['H', 'H', 'SP', 'SP', 'SP', 'SP', 'H', 'H', 'H', 'H'],
	];

	return (
		<View
			h={height}
			w='full'
			flex={1}
			backgroundColor='#4F3F37'
			justifyContent='flex-start'
			alignItems='center'
		>
			<Image
				source={require('../assets/chart.png')}
				resizeMode='contain'
				alt='Basic Strategy Chart'
				style={{
					alignContent: 'flex-start',
					width: width,
					marginTop: -40,
				}}
			/>

			<View bg='primary.900' margin='3' mt='-10'>
				<Image
					source={require('../assets/guidelines.png')}
					resizeMode='contain'
					alt='basic guidelines'
				/>
			</View>
		</View>
	);
};

export default QuickGuide;
