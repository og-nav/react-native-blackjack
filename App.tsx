import React from 'react';
import AppContainer from './src/components/app-container';
import DrawerNavigator from './src/navigation/SidebarNavigator';

export default function App() {
	return (
		<AppContainer>
			<DrawerNavigator />
		</AppContainer>
	);
}
