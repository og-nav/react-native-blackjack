import React, { useCallback } from 'react';
import { HStack, IconButton, useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Navbar = () => {
	const navigation = useNavigation<DrawerNavigationProp<{}>>();
	const handlePressMenuButton = useCallback(() => {
		navigation.openDrawer();
	}, [navigation]);

	return (
		<HStack
			w='full'
			h={40}
			alignItems='center'
			alignContent='center'
			p={4}
			marginBottom={-10}
		>
			<IconButton
				onPress={handlePressMenuButton}
				borderRadius={100}
				_icon={{
					as: Feather,
					name: 'menu',
					size: 8,
					color: useColorModeValue('primary.900', 'white'),
				}}
			/>
		</HStack>
	);
};

export default Navbar;
