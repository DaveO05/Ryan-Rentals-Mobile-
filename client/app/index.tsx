import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../src/navigation/AppNavigator';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App({ setIsAuthenticated }) {
  const [isAuthenticated, setAuthState] = useState(false);

  return isAuthenticated ? (
    <DrawerNavigator />
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsAuthenticated={setAuthState} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {(props) => <SignupScreen {...props} setIsAuthenticated={setAuthState} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
