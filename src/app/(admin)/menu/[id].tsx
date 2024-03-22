
import React, { useState } from 'react'
import products from '@assets/data/products'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import { defaultPizzaImage } from '@/components/productlistitem/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/provider/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProduct } from '@/api/products'

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]  // Array of Sizes

const ProductDetailScreen = () => {
  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
  const { addItem } = useCart()


  const { id: idString } = useLocalSearchParams(); // To read the path parameter inside the Product details screen 
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])                 
  const {data: products, error, isLoading} = useProduct(id)


  const addToCart = () => {
    
    if (!products) {
      return  
    }
    addItem(products, selectedSize)
    router.push("/cart")
  }

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) { //if the product not found
    return <Text>Failed to fetch the products</Text>

  }
  

  return (
      <View style={styles.container}> 

        <Stack.Screen 
          options={{ title: "Menu", 
            headerRight: () => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

      
        <Stack.Screen options={{ title: products.name }}/>

        <Image 
          source={{ uri: products.image || defaultPizzaImage }} 
          style={styles.image}
        />

        
        <Text style={styles.title}>{products.name}</Text>
        <Text style={styles.price}>RM{products.price}</Text>

      </View>
    )
  }





  const styles = StyleSheet.create({
    container:{
      backgroundColor: "white",
      flex: 1,
      padding: 10,
      alignItems:"center"
    },
    image:{
      width: "100%",
      aspectRatio: 1,
    },
    title: {
      justifyContent:"center",
      fontSize: 20,
      fontWeight: "bold",
    },
    price:{
      fontSize: 18,
      fontWeight: "bold",
    },

  })

export default ProductDetailScreen