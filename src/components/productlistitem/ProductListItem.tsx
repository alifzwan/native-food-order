import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { Product } from '@/types';
import Colors from '@/constants/Colors';

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png'

type ProductListItemProps = {
    product: Product
}

const ProductListItem = ({ product } : ProductListItemProps) => {
  return (
    <View style={styles.container}>
        <Image 
            source={{ uri: product.image || defaultPizzaImage }} 
            style={styles.image}
            resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
    </View>
    
  )
}

export default ProductListItem




const styles = StyleSheet.create({
    container: {
      backgroundColor:"white",
      padding: 10, // Space "inside" the container
  //  margin: 10   // Space "outside" the container
      borderRadius: 20,
      flex: 1,      // It will share the space equally amongst the siblings
      maxWidth:"50%"
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    
    price: {
      color: Colors.light.tint,
      fontWeight:"bold",
    },
    image: {
      width: "100%",
      aspectRatio: 1, // This is "Height"
    }
  });



// PROPS
// - How we send the props from our parent components() 
//   to our child component (ProductListItem)?


// Example (Javascript):

// <ProductListItem props={item}/>

// const ProductListItem = ({ props }) => {}

// {props.map((item) => (
// jsx
// ))}


// Example (TypeScript):

// <ProductListItem props={item}/>

// const ProductListItem = ({ props }) => {}

//   type Product = {
//     id: number;
//     image: string | null;
//     name: string;
//     price: number;
//   };