import React from 'react';
import { Button, Icon, IButtonProps } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorModeValue } from 'native-base';

interface Props extends IButtonProps {
	active: boolean;
	icon: string;
	children: React.ReactNode;
}

const MenuButton = ({ active, icon, children, ...props }: Props) => {
	return (
		<Button
			size='lg'
			_light={{
				_pressed: { bg: 'primary.600' },
				_text: { color: active ? 'primary.0' : 'primary.700' },
			}}
			_dark={{
				_pressed: { bg: 'primary.600' },
				_text: { color: active ? 'primary.100' : undefined },
			}}
			bg={active ? undefined : 'transparent'}
			variant='solid'
			justifyContent='flex-start'
			leftIcon={
				<Icon
					as={FontAwesome5}
					name={icon}
					size={19}
					opacity={1}
					color={useColorModeValue('primary.900', 'white')}
				/>
			}
			{...props}
		>
			{children}
		</Button>
	);
};

export default MenuButton;
