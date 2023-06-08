import React, { useCallback } from 'react';
import { HStack, VStack, IconButton, useColorModeValue } from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import AnimatedColorBox from './animated-color-box';
import { Feather } from '@expo/vector-icons';
import MenuButton from './menu-button';

const Sidebar = (props: DrawerContentComponentProps) => {
	const { state, navigation } = props;
	const currentRoute = state.routeNames[state.index];

	const handlePressBackButton = useCallback(() => {
		navigation.closeDrawer();
	}, [navigation]);

	const handlePressMenuMain = useCallback(() => {
		navigation.navigate('Main');
	}, [navigation]);

	const handlePressCardCounting = useCallback(() => {
		navigation.navigate('Card Counting Trainer');
	}, [navigation]);

	const handlePressMenuSettings = useCallback(() => {
		navigation.navigate('Settings');
	}, [navigation]);

	const handlePressMenuAbout = useCallback(() => {
		navigation.navigate('About');
	}, [navigation]);

	const handlePressBasicStrategy = useCallback(() => {
		navigation.navigate('Blackjack Basic Strategy Trainer');
	}, [navigation]);

	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('primary.50', 'primary.700')}
			p={7}
		>
			<VStack flex={1} space={2} mt={6}>
				<HStack justifyContent='flex-end'>
					<IconButton
						onPress={handlePressBackButton}
						borderRadius={100}
						variant='outline'
						borderColor={useColorModeValue('primary.900', 'white')}
						_icon={{
							as: Feather,
							name: 'chevron-left',
							size: 6,
							color: useColorModeValue('primary.900', 'white'),
						}}
					/>
				</HStack>
				<MenuButton
					active={currentRoute === 'Main'}
					onPress={handlePressMenuMain}
					icon='inbox'
				>
					Main
				</MenuButton>
				<MenuButton
					active={currentRoute === 'Blackjack Basic Strategy Trainer'}
					onPress={handlePressBasicStrategy}
					icon='inbox'
				>
					Basic Strategy Trainer
				</MenuButton>
				<MenuButton
					active={currentRoute === 'Card Counting Trainer'}
					onPress={handlePressCardCounting}
					icon='inbox'
				>
					Card Counting Trainer
				</MenuButton>
			</VStack>
		</AnimatedColorBox>
	);
};

export default Sidebar;
