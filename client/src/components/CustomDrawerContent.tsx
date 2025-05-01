import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('../../assets/images/logo.png')} // Replace with your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Ryan Rentals</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#4a90e2',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CustomDrawerContent;