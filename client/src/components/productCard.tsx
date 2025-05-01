import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
    margin: 8,
  },
});

export default ProductCard;
