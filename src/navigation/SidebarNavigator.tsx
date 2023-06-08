import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from '../components/sidebar';

//screens
import { Main, BasicStrategy } from '../screens';
import CardCounting from '../screens/cardcounting';

export type DrawerParamList = {
	Main: undefined;
	'Blackjack Basic Strategy Trainer': undefined;
	'Card Counting Trainer': undefined;
	Blackjack: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName='Blackjack Basic Strategy Trainer'
			drawerContent={(props) => <Sidebar {...props} />}
			screenOptions={{
				headerShown: false,
				drawerType: 'back',
				overlayColor: '#00000000',
			}}
		>
			<Drawer.Screen name='Main' component={Main} />
			<Drawer.Screen
				name='Blackjack Basic Strategy Trainer'
				component={BasicStrategy}
			/>
			<Drawer.Screen
				name='Card Counting Trainer'
				component={CardCounting}
			/>
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;
