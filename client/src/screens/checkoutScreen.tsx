  import React, { useState } from 'react';
  import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    TextInput 
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

  // Prop type for order items
  type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };

  type CheckoutScreenProps = {
    route?: {
      params?: {
        orderItems?: OrderItem[];
      };
    };
    navigation?: {
      goBack?: () => void;
      navigate?: (route: string) => void;
    };
  };

  const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ 
    route, 
    navigation 
  }) => {
    // Get order items from route params, default to empty array
    const orderItems = route?.params?.orderItems || [];

    const [shippingInfo, setShippingInfo] = useState({
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });

    // Calculate order summary dynamically
    const subtotal = orderItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
    const shippingCost = 9.99;
    const total = subtotal + shippingCost;

    const handleOrderConfirmation = () => {
      // Validate shipping and payment info
      if (Object.values(shippingInfo).some(value => value === '') ||
          Object.values(paymentInfo).some(value => value === '')) {
        alert('Please fill in all shipping and payment details');
        return;
      }
      alert('Order placed successfully!');
    };

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => navigation?.goBack?.() || navigation?.navigate?.('Catalog')}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Order Items Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cart" size={24} color="#4a90e2" />
            <Text style={styles.sectionTitle}>Order Items</Text>
          </View>
          
          {orderItems.length === 0 ? (
            <Text style={styles.noItemsText}>No items in your cart</Text>
          ) : (
            orderItems.map((item) => (
              <View key={item.id} style={styles.orderItemRow}>
                <View>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemQuantity}>x {item.quantity}</Text>
                </View>
                <Text style={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>

        {/* Shipping Information Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={24} color="#4a90e2" />
            <Text style={styles.sectionTitle}>Shipping Information</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={shippingInfo.fullName}
            onChangeText={(text) => setShippingInfo({...shippingInfo, fullName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={shippingInfo.address}
            onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
          />
          <View style={styles.inlineInputContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={shippingInfo.city}
              onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Zip Code"
              value={shippingInfo.zipCode}
              onChangeText={(text) => setShippingInfo({...shippingInfo, zipCode: text})}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Payment Information Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={24} color="#4a90e2" />
            <Text style={styles.sectionTitle}>Payment Details</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChangeText={(text) => setPaymentInfo({...paymentInfo, cardNumber: text})}
            keyboardType="numeric"
            maxLength={16}
          />
          <View style={styles.inlineInputContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry (MM/YY)"
              value={paymentInfo.expiryDate}
              onChangeText={(text) => setPaymentInfo({...paymentInfo, expiryDate: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChangeText={(text) => setPaymentInfo({...paymentInfo, cvv: text})}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleOrderConfirmation}
          >
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#333',
    },
    sectionContainer: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 12,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
      color: '#333',
    },
    orderItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    orderItemName: {
      fontSize: 16,
      fontWeight: '500',
    },
    orderItemQuantity: {
      color: '#888',
    },
    orderItemPrice: {
      fontSize: 16,
      fontWeight: '600',
    },
    input: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 12,
      marginVertical: 8,
      fontSize: 16,
    },
    inlineInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      width: '48%',
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    summaryLabel: {
      fontSize: 16,
      color: '#666',
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '500',
    },
    totalRow: {
      borderBottomWidth: 0,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: '#333',
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '700',
      color: '#4a90e2',
    },
    confirmButton: {
      backgroundColor: '#4a90e2',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      padding: 15,
      borderRadius: 12,
      shadowColor: '#4a90e2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    confirmButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
      marginRight: 10,
    },
    noItemsText: {
      textAlign: 'center',
      color: '#888',
      padding: 10,
    }
  });

  export default CheckoutScreen;