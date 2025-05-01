import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Dimensions 
} from 'react-native';
import { NavigationProp } from '../navigation/navigation-types';
import { MaterialIcons } from '@expo/vector-icons';

type HomeScreenProps = {
  navigation: NavigationProp;
};

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    
    <ImageBackground 
      source={require('../../assets/images/background.jpeg')} // Replace with your background
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Ryan Rentals</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Catalog')}
          >
            <MaterialIcons name="store" size={24} color="white" />
            <Text style={styles.buttonText}>View Catalog</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Checkout')}
          >
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: width * 0.8,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;