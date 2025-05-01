import React, { useEffect, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  StatusBar 
} from 'react-native';
import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Manually import product images
const PRODUCT_IMAGES = {
  "673fdd3c5f5ae159fbe80668": require('../../assets/images/Stainless-steel.jpg'),
  "6740ca44a772c9bc365a9fae": require('../../assets/images/Popcorn-machine.png'),
  "6740cf63a772c9bc365a9fb0": require('../../assets/images/Snowcone-machine.png'),
  "6740cfcfa772c9bc365a9fb2": require('../../assets/images/Chafing-dish-fuel.jpg'),
  "6740d699a772c9bc365a9fb6": require('../../assets/images/Hanging-chafing-dish.jpeg'),
  "6740d52fa772c9bc365a9fb4": require('../../assets/images/Gold-Chafing-Dish.jpeg'),
};

type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
};

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CatalogScreenProps = {
  navigation: any;
};

const CatalogScreen: React.FC<CatalogScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const url = ' https://ced0-142-214-83-46.ngrok-free.app/api/products';
    
    console.log('Attempting to fetch URL:', url);
    console.log('Platform:', Platform.OS);
  
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          ...(Platform.OS === 'android' && { 
            'User-Agent': 'ReactNative' 
          })
        }
      });

      console.log('Fetch successful:', {
        status: response.status,
        dataCount: response.data.length
      });

      setProducts(response.data);
      setLoading(false);
    } catch (error: unknown) {
      // Type-safe error handling
      let errorMessage = 'An unknown error occurred';
      
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message 
          || error.message 
          || 'Network error occurred';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Detailed Network Error:', {
        message: errorMessage,
        error: error
      });

      setError(errorMessage);
      setLoading(false);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const productImage = PRODUCT_IMAGES[item._id];

    return (
      <View style={styles.productCard}>
        {productImage ? (
          <Image 
            source={productImage} 
            style={styles.productImage} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <View style={styles.priceAddToCartContainer}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <MaterialIcons name="add-shopping-cart" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => ({
      ...prevCart,
      [product._id]: (prevCart[product._id] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => ({
        ...prevCart,
        [productId]: quantity
      }));
    }
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const calculateTotal = () => {
    return products
      .filter(product => cart[product._id])
      .reduce((total, product) => total + (product.price * cart[product._id]), 0)
      .toFixed(2);
  };

  const proceedToCheckout = () => {
    // Create order items directly from current cart and products
    const orderItems: OrderItem[] = products
      .filter(product => cart[product._id])
      .map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: cart[product._id]
      }));
  
    // Log the order items to verify
    console.log('Order Items:', orderItems);
  
    // Navigate to Checkout screen with order items
    navigation.navigate('Checkout', { 
      orderItems: orderItems 
    });
    
    // Close cart modal
    setIsCartModalVisible(false);
  };

  const renderCartModal = () => {
    const cartProducts = products.filter(product => cart[product._id]);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartModalVisible}
        onRequestClose={() => setIsCartModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Cart</Text>
            
            {cartProducts.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
              <FlatList
                data={cartProducts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.cartItemContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.cartItemDetails}>
                      <Text>${item.price.toFixed(2)}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item._id, cart[item._id] - 1)}
                        >
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{cart[item._id]}</Text>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item._id, cart[item._id] + 1)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <Text>${(item.price * cart[item._id]).toFixed(2)}</Text>
                    </View>
                  </View>
                )}
              />
            )}

            {cartProducts.length > 0 && (
              <Text style={styles.totalText}>
                Total: ${calculateTotal()}
              </Text>
            )}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setIsCartModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
              {cartProducts.length > 0 && (
                <TouchableOpacity 
                  style={styles.checkoutButton}
                  onPress={proceedToCheckout}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#1A73E8" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.cartIconContainer}
            onPress={() => setIsCartModalVisible(true)}
          >
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            {getTotalCartItems() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalCartItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#1A73E8" />
          </View>
        ) : error ? (
          <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={fetchProducts}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : products.length === 0 ? (
          <Text style={styles.noProductsText}>No products available.</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        )}

        {renderCartModal()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#1A73E8',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1A73E8',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#FF4081',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '47%', // Slightly less than half to create spacing
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  placeholderText: {
    color: '#666',
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    height: 40, // Fixed height to maintain consistent layout
  },
  priceAddToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  addToCartButton: {
    backgroundColor: '#1A73E8',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  cartItemContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#1A73E8',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeModalButton: {
    backgroundColor: '#FF4081',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  closeModalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#1A73E8',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  checkoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default CatalogScreen;

