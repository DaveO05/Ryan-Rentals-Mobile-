import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Linking,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ContactScreen: React.FC = () => {
  // Contact Information
  const phoneNumber = "+1 (555) 123-4567";
  const whatsappLink = "https://wa.me/15551234567";
  const facebookPageLink = "https://www.facebook.com/yourcompanypage";

  const openExternalLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`Cannot open URL: ${url}`);
      }
    } catch (error) {
      alert('An error occurred while opening the link');
    }
  };

  const makePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const ContactButton = ({ 
    icon: IconComponent, 
    iconName, 
    text, 
    colors, 
    onPress 
  }: { 
    icon: any, 
    iconName: string, 
    text: string, 
    colors: string[], 
    onPress: () => void 
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.contactButton}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <IconComponent name={iconName} size={24} color="white" />
        <Text style={styles.contactButtonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      {/* Contact Buttons */}
      <View style={styles.buttonsContainer}>
        <ContactButton 
          icon={FontAwesome}
          iconName="whatsapp" 
          text="WhatsApp" 
          colors={['#25D366', '#128C7E']} 
          onPress={() => openExternalLink(whatsappLink)} 
        />
        <ContactButton 
          icon={FontAwesome}
          iconName="facebook" 
          text="Facebook" 
          colors={['#3b5998', '#1f4e79']} 
          onPress={() => openExternalLink(facebookPageLink)} 
        />
        <ContactButton 
          icon={Ionicons}
          iconName="call" 
          text="Direct Call" 
          colors={['#4a90e2', '#357abd']} 
          onPress={makePhoneCall} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
  },
  contactButton: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ContactScreen;