// import {registerRootComponent} from 'expo';
import React from 'react';
import constants from './utils/constants';
import Splash from './pages/Splash';
import List from './pages/List';
import Add from './pages/Add/Add';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function App() {
  /**
   * Defined an array
   * with routes of application
   */
  const routes = [
    {
      name: constants.ROUTE_NAMES.Splash,
      component: Splash,
    },
    {
      name: constants.ROUTE_NAMES.List,
      component: List,
    },
    {
      name: constants.ROUTE_NAMES.Add,
      component: Add,
    },
  ];
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/**
         * Attaching loops to stack
         * by loop
         */}
        {routes.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// registerRootComponent(App);
