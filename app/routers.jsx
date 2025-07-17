// routers.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';     
import Login from './screens/login';
import SignUp from './screens/signup';
import Initial from './screens/initial';
import HeartPulse from './screens/heart-pulse';
import BloodGlucose from './screens/blood-glucose';
import Cholesterol from './screens/cholesterol';
import Medications from './screens/medications';

const Stack = createNativeStackNavigator();

export default function Routers() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="HeartPulse" component={HeartPulse} />
        <Stack.Screen name="BloodGlucose" component={BloodGlucose} />
        <Stack.Screen name="Cholesterol" component={Cholesterol} />
        <Stack.Screen name="Medications" component={Medications} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



