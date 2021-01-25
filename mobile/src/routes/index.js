import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home     from '../pages/Home';
import NewTask  from '../pages/NewTask';
import TaskInfo from '../pages/TaskInfo';

const Stack = createStackNavigator();

function Routes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="NewTask" component={NewTask} />
			<Stack.Screen name="TaskInfo" component={TaskInfo} />
		</Stack.Navigator>
	);
}

export default Routes;