import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SignIn from '../pages/SignIn';
import ForgetPassword from '../pages/ForgetPassword';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F15F5F' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="ForgetPassword" component={ForgetPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
