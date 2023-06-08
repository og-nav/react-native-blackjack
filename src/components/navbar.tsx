import React, { useCallback } from 'react';
import { HStack, IconButton, useColorModeValue, Text, View } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Navbar = () => {
	const navigation = useNavigation<DrawerNavigationProp<{}>>();
	const handlePressMenuButton = useCallback(() => {
		navigation.openDrawer();
	}, [navigation]);
	const route = useRoute();

	return (
		<HStack
			w='full'
			h={40}
			alignItems='center'
			alignContent='center'
			p={4}
			marginBottom={-12}
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
			<View justifyContent='center' borderRadius='25' p='3'>
				<Text fontSize='17'>{route.name}</Text>
			</View>
		</HStack>
	);
};

export default Navbar;
