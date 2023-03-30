import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from '../components/sidebar';

//screens
import { Main, BasicStrategy } from '../screens';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName='BasicStrategy'
			drawerContent={(props) => <Sidebar {...props} />}
			screenOptions={{
				headerShown: false,
				drawerType: 'back',
				overlayColor: '#00000000',
			}}
		>
			<Drawer.Screen name='Main' component={Main} />
			<Drawer.Screen name='BasicStrategy' component={BasicStrategy} />
		</Drawer.Navigator>
	);
}

export default DrawerNavigator;
