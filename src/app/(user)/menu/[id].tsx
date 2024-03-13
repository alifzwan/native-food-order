
import React, { useState } from 'react'
import products from '@assets/data/products'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { defaultPizzaImage } from '@/components/productlistitem/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]  // Array of Sizes

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams(); // To read the path parameter inside the Product details screen 
                                         
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const { addItem } = useCart()

  const router = useRouter()
  
  
  const product = products.find(
    (item) => item.id.toString() == id
  )

  const addToCart = () => {
    
    if(!product){
      return  
    }
    addItem(product, selectedSize)
    console.warn("Item Added")
    router.push("/cart")

  }

  

  if (!product) {  //if the product not found
    return <Text>Product Not Found</Text>
  }

  return (
      <View style={styles.container}> 
        <Stack.Screen options={{ title: product.name }}/>

        <Image 
          source={{ uri: product.image || defaultPizzaImage }} 
          style={styles.image}
        />

        <Text>Select Size</Text>
        <View style={styles.sizes}>
          {sizes.map(( size )=>(  // map the item in sizes's array
              <Pressable 
                onPress={() => { setSelectedSize (size)}}
                style={[ 
                  styles.size, { backgroundColor: selectedSize === size ? "gainsboro" : "white" } // Conditional Variable 
                ]} 
                key={size}
              >
                
                  <Text 
                    style={[
                      styles.sizeText, { color: selectedSize === size ? 'black': 'gray' }
                    ]}
                  >
                    {size}
                  </Text>
              </Pressable>
          ))}
        </View>
        
        <Text style={styles.price}>${product.price}</Text>

        <Button onPress={addToCart} text='Add to cart'/>
      </View>
    )
  }





  const styles = StyleSheet.create({
    container:{
      backgroundColor: "white",
      flex: 1,
      padding: 10,
    },
    image:{
      width: "100%",
      aspectRatio: 1,
    },
    price:{
      fontSize:18,
      fontWeight: "bold",
      marginTop: 'auto'
    },


    sizes: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    size: {
      backgroundColor: "gainsboro",
      width: 50,
      aspectRatio: 1,
      borderRadius: 25,
      alignItems: "center",     // Center Horizontally
      justifyContent: "center"  // Center Vertically
    },
    sizeText: {
      fontSize: 20,
      fontWeight: "500",
    }
    

  })

export default ProductDetailScreen