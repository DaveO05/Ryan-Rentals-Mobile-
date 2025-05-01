import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/homeScreen';
import CatalogScreen from '../screens/catalogScreen';
import CheckoutScreen from '../screens/checkoutScreen';
import ContactScreen from '../screens/ContactPage';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f8f8f8',
          width: 250,
        },
        headerStyle: {
          backgroundColor: '#4a90e2',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ryan Rentals',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          title: 'Product Catalog',
          drawerLabel: 'Browse Products',
        }}
      />
      <Drawer.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          drawerLabel: 'Checkout',
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Contact',
          drawerLabel: 'Contact',
        }}
      />
    </Drawer.Navigator>
  );
}
