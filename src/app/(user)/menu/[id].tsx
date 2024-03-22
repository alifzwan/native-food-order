
import React, { useState } from 'react'
// import products from '@assets/data/products'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import { defaultPizzaImage } from '@/components/productlistitem/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'
import { useProduct } from '@/api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']  // Array of Sizes

const ProductDetailScreen = () => {
  const router = useRouter()
                                         
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const { addItem } = useCart()

  const { id: idString } = useLocalSearchParams(); // To read the path parameter inside the Product details screen 
  const id = parseFloat(typeof idString === "string" ? idString : idString[0])
  const { data: products, error, isLoading } = useProduct(id)
  

  const addToCart = () => {
    if (!products) {
      return  
    }
    addItem(products, selectedSize)
    router.push("/cart")
  }

  
  if (isLoading){
    return <ActivityIndicator />
  }

  if (error){
    return <Text>Failed to fetch the products</Text>
  }

  return (
      <View style={styles.container}> 
        <Stack.Screen options={{ title: products.name }}/>

        <Image 
          source={{ uri: products.image || defaultPizzaImage }} 
          style={styles.image}
        />

        <Text>Select Size</Text>
        <View style={styles.sizes}>
          {sizes.map(( size )=>(  // map the item in sizes's array
              <Pressable 
                onPress={() => { setSelectedSize (size) }}
                style={[ 
                  styles.size, 
                  { backgroundColor: selectedSize === size ? "gainsboro" : "white" } // Conditional Variable 
                ]} 
                key={size}
              >
                
                  <Text 
                    style={[
                      styles.sizeText, 
                      { color: selectedSize === size ? 'black': 'gray' }
                    ]}
                  >
                    {size}
                  </Text>
              </Pressable>
          ))}
        </View>
        
        <Text style={styles.price}>RM{products.price}</Text>

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