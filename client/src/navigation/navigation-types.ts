import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Catalog: undefined;
  Checkout: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;