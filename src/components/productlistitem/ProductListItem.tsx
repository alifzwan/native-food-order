import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { Product } from '@/types';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png'


type ProductListItemProps = {
    product: Product
}

const ProductListItem = ({ product } : ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
        <Pressable style={styles.container}>
            <Image 
                source={{ uri: product.image || defaultPizzaImage }} 
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </Pressable>
    </Link>
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



/*  
    * PROPS

    - How we send the props from our parent components() 
      to our child component (ProductListItem)?

    * Javascript - We simply receive the props as parameter
    * Typescript - We have to define the types of the props


    * (Javascript):

    * We don't need to define the type of prop
    * We simply receive it as parameter


    <ProductListItem props={item}/>

    const ProductListItem = ({ props }) => {}



    *(TypeScript):

    * We need to define the data type of the props 


    type ProductListItemProps = {
      product: Product
    }

    * Static Type:

    type Product = {
        id: number;
        image: string | null;
        name: string;
        price: number;
    };

    const ProductListItem = ({ props }) => {}
    
*/   


